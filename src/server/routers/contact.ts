import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { publicProcedure, router } from "@/server/trpc"

export const contactRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } })
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.contactMessage.create({ data: input })
    }),

  markRead: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return prisma.contactMessage.update({
        where: { id: input.id },
        data: { read: true },
      })
    }),
})
