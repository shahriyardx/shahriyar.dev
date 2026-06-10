import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { publicProcedure, router } from "@/server/trpc"

export const blogRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.post.findMany({ orderBy: { createdAt: "desc" } })
  }),

  listPublished: publicProcedure.query(async () => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    })
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return prisma.post.findUnique({ where: { slug: input.slug } })
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(false),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.post.create({ data: input })
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        published: z.boolean().default(false),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      return prisma.post.update({ where: { id }, data })
    }),

  incrementViews: publicProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.post.update({
        where: { slug: input.slug },
        data: { views: { increment: 1 } },
      })
      return { success: true }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.post.delete({ where: { id: input.id } })
      return { success: true }
    }),
})
