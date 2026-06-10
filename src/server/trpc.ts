import { initTRPC } from "@trpc/server"

export function createContext() {
  return {}
}

const t = initTRPC.context<typeof createContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
