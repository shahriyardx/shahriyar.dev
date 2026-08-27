import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Section } from "@/components/section"
import { PageHeader } from "@/components/page-header"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on web development, technology, and building things.",
}

const clean = (title: string) => title.replace(/^["'“”]+|["'“”]+$/g, "").trim()

const shortDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <Section className="pt-28">
      <PageHeader eyebrow="Writing" title="Blog">
        Thoughts on web development, technology, and building things.
      </PageHeader>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          No posts yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-12 flex flex-col divide-y">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h2 className="font-sans font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
                    {clean(post.title)}
                  </h2>
                  <time
                    dateTime={post.createdAt.toISOString()}
                    className="shrink-0 font-mono text-xs text-muted-foreground/60"
                  >
                    {shortDate(post.createdAt)}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
