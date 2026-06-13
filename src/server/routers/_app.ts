import { router } from "@/server/trpc"
import { projectRouter } from "@/server/routers/project"
import { blogRouter } from "@/server/routers/blog"
import { contactRouter } from "@/server/routers/contact"
import { commentRouter } from "@/server/routers/comment"

export const appRouter = router({
  project: projectRouter,
  blog: blogRouter,
  contact: contactRouter,
  comment: commentRouter,
})

export type AppRouter = typeof appRouter
