import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { publicProcedure, router } from "@/server/trpc"

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
