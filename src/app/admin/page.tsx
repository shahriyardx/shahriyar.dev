import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function AdminSetupPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/auth/login?callbackURL=/admin")

  const user = session.user
  const userRole = (user as { role?: string }).role
  const adminExists = await prisma.user.count({ where: { role: "admin" } })

  if (!adminExists) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "admin" },
    })
    redirect("/dashboard")
  }

  if (userRole === "admin") redirect("/dashboard")

  redirect("/")
}
