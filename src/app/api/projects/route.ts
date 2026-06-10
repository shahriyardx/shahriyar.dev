import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  })
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
      url: body.url,
      tags: body.tags ?? [],
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  })
  return NextResponse.json(project, { status: 201 })
}
