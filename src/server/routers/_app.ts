import { router } from "@/server/trpc"
import { projectRouter } from "@/server/routers/project"
import { blogRouter } from "@/server/routers/blog"

export const appRouter = router({
  project: projectRouter,
  blog: blogRouter,
})

export type AppRouter = typeof appRouter
