"use client"

import Link from "next/link"
import { FolderOpen, PencilSimple, Plus, Trash } from "@phosphor-icons/react"
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

export default function ProjectsPage() {
  const utils = trpc.useUtils()
  const { data: projects = [] } = trpc.project.list.useQuery()
  const deleteProject = trpc.project.delete.useMutation({
    onSuccess: () => {
      toast.success("Project deleted")
      utils.project.list.invalidate()
    },
    onError: () => toast.error("Failed to delete project"),
  })

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your portfolio projects.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/projects/new">
            <Plus size={16} weight="bold" />
            New Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 && (
        <div className="flex flex-col items-center gap-4 border border-dashed p-12 text-center">
          <div className="flex size-12 items-center justify-center border bg-muted/30 text-muted-foreground">
            <FolderOpen size={24} />
          </div>
          <div>
            <p className="font-medium">No projects yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first project to get started.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/projects/new">
              <Plus size={14} weight="bold" />
              New Project
            </Link>
          </Button>
        </div>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle className="text-base">{project.title}</CardTitle>
                {!project.published && (
                  <Badge variant="outline" className="text-xs">
                    Draft
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-1">
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1 ml-auto">
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/projects/${project.id}/edit`}>
                    <PencilSimple size={14} />
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteProject.mutate({ id: project.id })}
                  disabled={deleteProject.isPending}
                >
                  <Trash size={14} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
