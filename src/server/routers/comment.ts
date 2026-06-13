import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { publicProcedure, router } from "@/server/trpc"
import { callDeepSeek, generateAutoReplyComment } from "@/server/ai"

async function moderateComment(content: string): Promise<{ safe: boolean; reason?: string }> {
  const systemPrompt =
    'You are a content moderator. Check if the given comment contains: 18+ content, NSFW material, spam, dangerous/malicious content, hate speech, harassment, excessive emoji, or anything that could cause issues. Respond with valid JSON only: {"safe": boolean}. If unsafe, include a reason field: {"safe": false, "reason": "short reason"}. Be strict — reject anything borderline.'

  try {
    const text = await callDeepSeek(systemPrompt, content)
    return JSON.parse(text)
  } catch {
    return { safe: false, reason: "Moderation failed" }
  }
}

async function generateAutoReply(commentId: string, postId: string, commentContent: string): Promise<void> {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { title: true, content: true },
    })
    if (!post) return

    const result = await generateAutoReplyComment({
      postTitle: post.title,
      postContent: post.content,
      commentContent,
    })
    if (!result.shouldReply || !result.replyText) return

    await prisma.comment.create({
      data: {
        content: result.replyText,
        postId,
        parentId: commentId,
      },
    })
  } catch {
    // Swallow — original comment already saved
  }
}

export const commentRouter = router({
  list: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const comments = await prisma.comment.findMany({
        where: { postId: input.postId, parentId: null },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          user: { select: { name: true, image: true } },
          replies: {
            orderBy: { createdAt: "asc" },
            select: {
              id: true,
              content: true,
              userId: true,
              createdAt: true,
              user: { select: { name: true, image: true } },
            },
          },
        },
      })
      return comments
    }),

  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1).max(1000),
        userId: z.string().optional(),
        postId: z.string(),
        parentId: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const verdict = await moderateComment(input.content)
      if (!verdict.safe) {
        throw new Error(verdict.reason ?? "Comment rejected by moderation")
      }

      const comment = await prisma.comment.create({
        data: {
          content: input.content,
          userId: input.userId,
          postId: input.postId,
          parentId: input.parentId,
        },
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          user: { select: { name: true, image: true } },
        },
      })

      if (!input.parentId) {
        void generateAutoReply(comment.id, input.postId, input.content)
      }

      return comment
    }),

  delete: publicProcedure
    .input(z.object({ commentId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const comment = await prisma.comment.findUnique({
        where: { id: input.commentId },
        select: { userId: true },
      })
      if (!comment) throw new Error("Comment not found")

      const user = await prisma.user.findUnique({
        where: { id: input.userId },
        select: { role: true },
      })
      if (!user) throw new Error("User not found")

      const isOwner = comment.userId === input.userId
      const isAdmin = user.role === "admin"
      if (!isOwner && !isAdmin) throw new Error("Not authorized")

      await prisma.comment.delete({ where: { id: input.commentId } })
      return { success: true }
    }),
})
