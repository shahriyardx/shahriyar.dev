import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin } from "better-auth/plugins"
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
  plugins: [admin()],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // First account ever becomes the admin; everyone after signs up
          // as a regular user (needed for blog comments).
          const count = await prisma.user.count()
          return { data: { ...user, role: count === 0 ? "admin" : "user" } }
        },
      },
    },
  },
})
