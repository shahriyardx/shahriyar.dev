"use client"

import Link from "next/link"
import { FileText, PencilSimple, Plus, Trash } from "@phosphor-icons/react"
import { trpc } from "@/lib/trpc/client"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function BlogPage() {
  const utils = trpc.useUtils()
  const { data: posts = [] } = trpc.blog.list.useQuery()
  const deletePost = trpc.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted")
      utils.blog.list.invalidate()
    },
    onError: () => toast.error("Failed to delete post"),
  })

  const published = posts.filter((p) => p.published)
  const drafts = posts.filter((p) => !p.published)

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your blog posts.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <Plus size={16} weight="bold" />
            New Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center gap-4 border border-dashed p-12 text-center">
          <div className="flex size-12 items-center justify-center border bg-muted/30 text-muted-foreground">
            <FileText size={24} />
          </div>
          <div>
            <p className="font-medium">No posts yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Write your first blog post.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/blog/new">
              <Plus size={14} weight="bold" />
              New Post
            </Link>
          </Button>
        </div>
      )}

      {published.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Published ({published.length})
          </h2>
          <div className="grid gap-4">
            {published.map((post) => (
              <PostCard key={post.id} post={post} onDelete={() => deletePost.mutate({ id: post.id })} />
            ))}
          </div>
        </div>
      )}

      {drafts.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Drafts ({drafts.length})
          </h2>
          <div className="grid gap-4">
            {drafts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={() => deletePost.mutate({ id: post.id })} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PostCard({ post, onDelete }: { post: { id: string; title: string; slug: string; excerpt: string | null; tags: string[]; published: boolean; views: number }; onDelete: () => void }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <CardTitle className="text-base">{post.title}</CardTitle>
          {!post.published && (
            <Badge variant="outline" className="text-xs">Draft</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">/{post.slug}</span>
          <span className="text-xs text-muted-foreground">{post.views} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/blog/${post.id}/edit`}>
              <PencilSimple size={14} />
            </Link>
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash size={14} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
