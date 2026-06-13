import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { env } from "@/lib/env"
import { publicProcedure, router } from "@/server/trpc"

const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

async function moderateComment(content: string): Promise<{ safe: boolean; reason?: string }> {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a content moderator. Check if the given comment contains: 18+ content, NSFW material, spam, dangerous/malicious content, hate speech, harassment, excessive emoji, or anything that could cause issues. Respond with valid JSON only: {\"safe\": boolean}. If unsafe, include a reason field: {\"safe\": false, \"reason\": \"short reason\"}. Be strict — reject anything borderline.",
        },
        { role: "user", content },
      ],
      stream: false,
    }),
  })

  if (!res.ok) throw new Error("Moderation service unavailable")

  const data = await res.json()
  const text = data.choices?.[0]?.message?.content ?? ""

  try {
    return JSON.parse(text)
  } catch {
    return { safe: false, reason: "Moderation failed" }
  }
}

export const commentRouter = router({
  list: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      return prisma.comment.findMany({
        where: { postId: input.postId },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          user: { select: { name: true, image: true } },
        },
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1).max(1000),
        userId: z.string(),
        postId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const verdict = await moderateComment(input.content)
      if (!verdict.safe) {
        throw new Error(verdict.reason ?? "Comment rejected by moderation")
      }

      return prisma.comment.create({
        data: {
          content: input.content,
          userId: input.userId,
          postId: input.postId,
        },
        select: {
          id: true,
          content: true,
          userId: true,
          createdAt: true,
          user: { select: { name: true, image: true } },
        },
      })
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
