"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, Sparkle } from "@phosphor-icons/react"
import { Comark } from "@comark/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select"
import { generateContent, generateExcerpt, suggestTags, suggestTitle } from "@/lib/ai"

const TAGS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Python", "PostgreSQL", "Docker", "Prisma", "GraphQL",
  "Tailwind CSS", "Linux", "WebSocket", "CSS", "HTML",
  "Career", "Tutorial", "Open Source", "DevOps", "Performance",
  "Security", "Architecture", "Testing", "AI", "Database",
]

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  tags: z.array(z.string()),
  published: z.boolean(),
})

export type BlogFormData = z.infer<typeof blogFormSchema>

interface BlogFormProps {
  defaultValues?: BlogFormData
  onSubmit: (data: BlogFormData) => void
  isPending?: boolean
  submitLabel?: string
}

export function BlogForm({
  defaultValues = { title: "", slug: "", content: "", excerpt: "", tags: [], published: false },
  onSubmit,
  isPending,
  submitLabel = "Save",
}: BlogFormProps) {
  const [aiLoading, setAiLoading] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  })

  const generateFromTopic = async () => {
    const title = form.getValues("title")
    if (!title) return
    setAiLoading("content")
    try {
      const content = await generateContent(title)
      form.setValue("content", content)
      const excerpt = await generateExcerpt(content.slice(0, 500))
      form.setValue("excerpt", excerpt)
      const tags = await suggestTags(content.slice(0, 500))
      if (tags.length) form.setValue("tags", tags)
    } catch { /* ignore */ }
    setAiLoading(null)
  }

  const handleSuggestTitle = async () => {
    const title = form.getValues("title")
    if (!title) return
    setAiLoading("title")
    try {
      const suggested = await suggestTitle(title)
      form.setValue("title", suggested)
    } catch { /* ignore */ }
    setAiLoading(null)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex items-end gap-2">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel htmlFor={field.name}>Title</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Blog post title"
                autoComplete="off"
                onChange={(e) => {
                  field.onChange(e)
                  form.setValue("slug", generateSlug(e.target.value))
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="button" variant="outline" size="icon" onClick={handleSuggestTitle} disabled={aiLoading === "title"} title="Suggest title with AI">
          <Sparkle size={14} weight={aiLoading === "title" ? "fill" : "regular"} />
        </Button>
      </div>

      <Controller
        name="slug"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="my-blog-post"
              autoComplete="off"
            />
            <FieldDescription>URL-friendly identifier. Auto-generated from title.</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="content"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={field.name}>Content</FieldLabel>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => setPreview(!preview)} className="gap-1">
                  <Eye size={12} />
                  {preview ? "Write" : "Preview"}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={generateFromTopic} disabled={aiLoading === "content"} className="gap-1">
                  <Sparkle size={12} weight={aiLoading === "content" ? "fill" : "regular"} />
                  {aiLoading === "content" ? "Generating..." : "AI Generate"}
                </Button>
              </div>
            </div>
            {preview ? (
              <div className="min-h-[300px] rounded-md border p-4 text-sm leading-relaxed">
                <div className="text-sm">
                  <Comark>{field.value}</Comark>
                </div>
              </div>
            ) : (
              <Textarea
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Write your blog post content here... Supports markdown."
                className="min-h-[300px] font-mono text-sm"
              />
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="excerpt"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Excerpt</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Short summary for preview cards"
              className="min-h-[80px]"
            />
            <FieldDescription>Shown on blog listing cards.</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="tags"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
            <MultiSelect values={field.value} onValuesChange={field.onChange}>
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Select tags" />
              </MultiSelectTrigger>
              <MultiSelectContent search={{ placeholder: "Search tags..." }}>
                {TAGS.map((tag) => (
                  <MultiSelectItem key={tag} value={tag}>
                    {tag}
                  </MultiSelectItem>
                ))}
              </MultiSelectContent>
            </MultiSelect>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="published"
        control={form.control}
        render={({ field }) => (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="size-4"
            />
            Publish immediately
          </label>
        )}
      />

      <Button type="submit" className="self-start" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  )
}
