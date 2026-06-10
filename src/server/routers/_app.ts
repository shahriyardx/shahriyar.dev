import { router } from "@/server/trpc"
import { projectRouter } from "@/server/routers/project"
import { blogRouter } from "@/server/routers/blog"
import { contactRouter } from "@/server/routers/contact"

export const appRouter = router({
  project: projectRouter,
  blog: blogRouter,
  contact: contactRouter,
})

export type AppRouter = typeof appRouter
