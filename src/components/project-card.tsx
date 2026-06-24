import { ArrowUpRight, Code } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export interface Project {
  title: string
  description: string
  url: string
  tags: string[]
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex flex-col">
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center border bg-muted/50">
          <Code size={18} />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </CardContent>
      <CardFooter className="flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 shrink-0">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            Live site <ArrowUpRight size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
