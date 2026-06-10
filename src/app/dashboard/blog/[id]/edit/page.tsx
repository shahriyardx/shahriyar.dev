"use client"

import { useParams, useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { BlogForm, type blogFormSchema } from "@/components/blog-form"
import { toast } from "sonner"
import type { z } from "zod"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BlogFormData = z.infer<typeof blogFormSchema>

export default function EditBlogPostPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const utils = trpc.useUtils()
  const { data: posts } = trpc.blog.list.useQuery()
  const post = posts?.find((p) => p.id === id)

  const updatePost = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Post updated")
      utils.blog.list.invalidate()
      router.push("/dashboard/blog")
    },
    onError: () => toast.error("Failed to update post"),
  })

  if (!post) {
    return <div className="p-6 text-sm text-muted-foreground">Post not found.</div>
  }

  const onSubmit = (data: BlogFormData) => {
    updatePost.mutate({ id, ...data })
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Editing &ldquo;{post.title}&rdquo;
        </p>
      </div>

      <div className="max-w-2xl">
        <BlogForm
          defaultValues={{
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt ?? "",
            tags: post.tags,
            published: post.published,
          }}
          onSubmit={onSubmit}
          isPending={updatePost.isPending}
          submitLabel="Update Post"
        />
      </div>
    </div>
  )
}
