import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/section"

import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on web development, technology, and building things.",
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <Section className="pt-28">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black leading-[0.9] tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Thoughts on web development, technology, and building things.
        </p>
      </div>

      {posts.length === 0 && (
        <p className="mt-12 text-sm text-muted-foreground">No posts yet. Check back soon.</p>
      )}

      <div className="mt-12 grid gap-6">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group border p-6 transition-all hover:border-foreground/30 hover:bg-muted/20"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <span className="hidden font-mono text-sm leading-7 text-muted-foreground/40 sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-3">
                <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-muted-foreground md:text-2xl">
                  {post.title.replace(/^["'“”]+|["'“”]+$/g, "").trim()}
                </h2>
                {post.excerpt && (
                  <p className="leading-relaxed text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-muted-foreground/50">·</span>
                  <span className="text-xs text-muted-foreground">
                    {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read
                  </span>
                  {post.tags.length > 0 && (
                    <>
                      <span className="text-xs text-muted-foreground/50">·</span>
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
