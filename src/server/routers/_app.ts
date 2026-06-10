import { router } from "@/server/trpc"
import { projectRouter } from "@/server/routers/project"

export const appRouter = router({
  project: projectRouter,
})

export type AppRouter = typeof appRouter
