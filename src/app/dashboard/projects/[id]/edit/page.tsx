"use client"

import { useParams, useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { ProjectForm, type projectFormSchema } from "@/components/project-form"
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

type ProjectFormData = z.infer<typeof projectFormSchema>

export default function EditProjectPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const utils = trpc.useUtils()
  const { data: projects } = trpc.project.list.useQuery()
  const project = projects?.find((p) => p.id === id)

  const updateProject = trpc.project.update.useMutation({
    onSuccess: () => {
      toast.success("Project updated")
      utils.project.list.invalidate()
      router.push("/dashboard/projects")
    },
    onError: () => toast.error("Failed to update project"),
  })

  if (!project)
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Project not found.
      </div>
    )

  const onSubmit = (data: ProjectFormData) => {
    updateProject.mutate({ id, ...data })
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update &ldquo;{project.title}&rdquo;
        </p>
      </div>

      <div className="max-w-lg">
        <ProjectForm
          defaultValues={{
            title: project.title,
            description: project.description,
            url: project.url,
            tags: project.tags,
          }}
          onSubmit={onSubmit}
          isPending={updateProject.isPending}
          submitLabel="Update Project"
        />
      </div>
    </div>
  )
}
