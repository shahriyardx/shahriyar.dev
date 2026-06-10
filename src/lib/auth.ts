import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./prisma"
import { env } from "./env"

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: false },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async () => {
          const count = await prisma.user.count()
          if (count >= 1) {
            throw new Error("Only one admin account allowed")
          }
        },
      },
    },
  },
})
