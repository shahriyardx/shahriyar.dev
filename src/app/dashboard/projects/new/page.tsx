"use client"

import { useRouter } from "next/navigation"
import { trpc } from "@/lib/trpc/client"
import { ProjectForm, projectFormSchema } from "@/components/project-form"
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

export default function NewProjectPage() {
  const router = useRouter()
  const utils = trpc.useUtils()
  const createProject = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate()
      router.push("/dashboard/projects")
    },
  })

  const onSubmit = (data: ProjectFormData) => {
    createProject.mutate(data)
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
            <BreadcrumbPage>New Project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new project to your portfolio.
        </p>
      </div>

      <div className="max-w-lg rounded-lg border p-6">
        <ProjectForm
          onSubmit={onSubmit}
          isPending={createProject.isPending}
          submitLabel="Create Project"
        />
      </div>
    </div>
  )
}
