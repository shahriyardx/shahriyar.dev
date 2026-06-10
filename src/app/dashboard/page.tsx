import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="border p-5 transition-colors hover:bg-muted/30">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </Link>
  )
}

export default async function Dashboard() {
  const [projectCount, postCount, publishedCount, totalViews] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.aggregate({ _sum: { views: true } }).then((r) => r._sum.views ?? 0),
  ])

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your site.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Projects" value={projectCount} href="/dashboard/projects" />
        <StatCard label="Total posts" value={postCount} href="/dashboard/blog" />
        <StatCard label="Published" value={publishedCount} href="/dashboard/blog" />
        <StatCard label="Total views" value={totalViews} href="/dashboard/blog" />
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"/></svg>
            New post
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/projects/new">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"/></svg>
            New project
          </Link>
        </Button>
      </div>
    </div>
  )
}
