import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Markdown } from "@/components/markdown"
import { Comments } from "@/components/comments"
import { PostSummary } from "@/components/post-summary"
import { Icon } from "@/components/icon-wrapper"
import { TableOfContents } from "@/components/toc"
import { extractTOC } from "@/lib/toc"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return { title: "Not Found" }
  return {
    title: post.title,
    description: post.excerpt ?? post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? post.title,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })

  if (!post || !post.published) notFound()

  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  })

  const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))

  const related = post.tags.length > 0
    ? await prisma.post.findMany({
        where: {
          published: true,
          id: { not: post.id },
          tags: { hasSome: post.tags },
        },
        take: 3,
        orderBy: { createdAt: "desc" },
      })
    : []

  const tocItems = extractTOC(post.content)

  return (
    <article className="mx-auto max-w-5xl px-6 pt-28 pb-20">
      <Link
        href="/blog"
        className="mb-8 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="ArrowLeft" size={14} />
        Back to blog
      </Link>

      <header className="flex flex-col gap-4">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
        <h1 className="text-4xl font-black leading-[0.9] tracking-tight md:text-5xl">
          {post.title.replace(/^["'“”]+|["'“”]+$/g, "").trim()}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.createdAt.toISOString()}>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </time>
          <span className="text-muted-foreground/50">·</span>
          <span>{readTime} min read</span>
        </div>
      </header>

      <PostSummary tldr={post.tldr} keyTakeaways={post.keyTakeaways} />

      <div className="mt-12 flex gap-12">
        <div className="min-w-0 flex-1">
          <Markdown>{post.content}</Markdown>
        </div>
        {tocItems.length > 0 && (
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        )}
      </div>

      <Comments postId={post.id} postSlug={slug} />

      {related.length > 0 && (
        <div className="mt-20 border-t pt-12">
          <h2 className="text-2xl font-bold tracking-tight">Related posts</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`} className="group border p-5">
                <h3 className="font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
                  {r.title.replace(/^["'“”]+|["'“”]+$/g, "").trim()}
                </h3>
                {r.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "short", day: "numeric",
                  })} · {Math.max(1, Math.ceil(r.content.split(/\s+/).length / 200))} min read
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
