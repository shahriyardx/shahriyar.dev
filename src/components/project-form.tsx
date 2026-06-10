"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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

const TAGS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Python", "PostgreSQL", "MongoDB", "Docker", "Redis",
  "Prisma", "GraphQL", "Tailwind CSS", "Linux", "Git",
  "NGINX", "Discord", "Stripe", "AWS", "Vercel",
  "Figma", "Biome", "Bun", "Storybook", "Playwright",
  "Radix UI", "Framer Motion", "CSS", "HTML", "Express",
  "WebSocket", "D3.js", "Sanity", "Kafka", "RabbitMQ",
  "Firebase", "Cloudflare", "React Native", "Electron",
] as const

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  url: z.string().url("Must be a valid URL"),
  tags: z.array(z.string()),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>

interface ProjectFormProps {
  defaultValues?: ProjectFormData
  onSubmit: (data: ProjectFormData) => void
  isPending?: boolean
  submitLabel?: string
}

export function ProjectForm({
  defaultValues = { title: "", description: "", url: "", tags: [] },
  onSubmit,
  isPending,
  submitLabel = "Save",
}: ProjectFormProps) {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Title</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Project name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="url"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>URL</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="https://..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="description"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Short description"
            />
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
            <MultiSelect
              values={field.value}
              onValuesChange={field.onChange}
            >
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Select technologies" />
              </MultiSelectTrigger>
              <MultiSelectContent search={{ placeholder: "Search technologies..." }}>
                {TAGS.map((tag) => (
                  <MultiSelectItem key={tag} value={tag}>
                    {tag}
                  </MultiSelectItem>
                ))}
              </MultiSelectContent>
            </MultiSelect>
            <FieldDescription>Select the technologies used in this project.</FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" className="self-start" disabled={isPending}>
        {isPending ? "Saving..." : submitLabel}
      </Button>
    </form>
  )
}
