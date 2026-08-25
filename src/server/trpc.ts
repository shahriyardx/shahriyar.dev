import { initTRPC, TRPCError } from "@trpc/server"
import { auth } from "@/lib/auth"

export async function createContext({ req }: { req: Request }) {
  const session = await auth.api.getSession({ headers: req.headers })
  return { session }
}

type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

/** Requires a signed-in user; narrows `ctx.session` to non-null. */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({ ctx: { session: ctx.session } })
})

/** Requires the admin role on the session user. */
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  const role = (ctx.session.user as { role?: string }).role
  if (role !== "admin") throw new TRPCError({ code: "FORBIDDEN" })
  return next()
})
