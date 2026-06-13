import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { publicProcedure, router } from "@/server/trpc"

export const projectRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.project.findMany({ orderBy: { createdAt: "desc" } })
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        url: z.string().url(),
        tags: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.project.create({
        data: {
          title: input.title,
          description: input.description,
          url: input.url,
          tags: input.tags,
        },
      })
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        description: z.string().min(1),
        url: z.string().url(),
        tags: z.array(z.string()).default([]),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input
      return prisma.project.update({ where: { id }, data })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.project.delete({ where: { id: input.id } })
      return { success: true }
    }),
})
