"use client"

import { useRouter } from "next/navigation"
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

export default function NewBlogPostPage() {
  const router = useRouter()
  const utils = trpc.useUtils()
  const createPost = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Post created")
      utils.blog.list.invalidate()
      router.push("/dashboard/blog")
    },
    onError: () => toast.error("Failed to create post"),
  })

  const onSubmit = (data: BlogFormData) => {
    createPost.mutate(data)
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
            <BreadcrumbPage>New Post</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Post</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Write a new blog post with AI assistance.
        </p>
      </div>

      <div className="max-w-2xl">
        <BlogForm
          onSubmit={onSubmit}
          isPending={createPost.isPending}
          submitLabel="Create Post"
        />
      </div>
    </div>
  )
}
