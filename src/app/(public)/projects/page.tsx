import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"
import { PageHeader } from "@/components/page-header"

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
      <PageHeader eyebrow="Work" title="Projects">
        Things I&apos;ve designed and built — web apps, tools, and experiments.
      </PageHeader>

      {projects.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">No projects yet.</p>
      )}
    </Section>
  )
}
