import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"
import { Cmd, PageHeader } from "@/components/terminal"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of projects I've designed and built — web apps, tools, and experiments.",
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <Section className="pt-28 md:pt-36">
      <PageHeader cmd="ls ./projects" title="Projects">
        Things I&apos;ve designed and built — web apps, tools, and experiments.
      </PageHeader>

      {projects.length > 0 ? (
        <>
          <p className="mt-10 text-xs text-muted-foreground/60">
            total {projects.length}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <Cmd className="mt-8">
            <span className="text-muted-foreground/60">
              {projects.length} director
              {projects.length === 1 ? "y" : "ies"} listed
            </span>
          </Cmd>
        </>
      ) : (
        <p className="mt-10 text-muted-foreground">No projects yet.</p>
      )}
    </Section>
  )
}
