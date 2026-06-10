import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/section"

import type { Metadata } from "next"

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

      <div className="mt-12 grid gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group border-b pb-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-muted-foreground">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })} · {Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read
                </span>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  )
}
