import type { Metadata } from "next"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Section } from "@/components/section"
import { Cmd, PageHeader } from "@/components/terminal"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on web development, technology, and building things.",
}

const clean = (title: string) => title.replace(/^["'“”]+|["'“”]+$/g, "").trim()

const readingTime = (content: string) =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200))

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <Section className="pt-28">
      <PageHeader cmd="ls -la ./posts" title="Blog">
        Thoughts on web development, technology, and building things.
      </PageHeader>

      {posts.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">
          No posts yet. Check back soon.
        </p>
      ) : (
        <>
          <p className="mt-10 text-xs text-muted-foreground/60">
            total {posts.length}
          </p>

          <ul className="mt-2 flex flex-col border-t">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 border-b py-5 transition-colors hover:bg-muted/20 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  {/* The `ls -la` gutter: date, then size-as-reading-time */}
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground/60 sm:w-28">
                    {new Date(post.createdAt).toLocaleDateString("en-CA")}
                  </span>
                  <span className="hidden shrink-0 text-xs tabular-nums text-muted-foreground/40 sm:block sm:w-16">
                    {readingTime(post.content)} min
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <h2 className="font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
                      {clean(post.title)}
                    </h2>
                    {post.excerpt && (
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <p className="flex flex-wrap gap-2 text-[11px] text-muted-foreground/50">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </p>
                    )}
                  </div>

                  <span
                    className="hidden shrink-0 text-xs text-muted-foreground/30 transition-colors group-hover:text-foreground sm:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Cmd className="mt-8">
            <span className="text-muted-foreground/60">
              {posts.length} file{posts.length === 1 ? "" : "s"} listed
            </span>
          </Cmd>
        </>
      )}
    </Section>
  )
}
