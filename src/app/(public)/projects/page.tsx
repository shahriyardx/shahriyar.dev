import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"

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
      <div className="flex flex-col gap-4">
        <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-black tracking-tight">
          Projects
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Things I&apos;ve designed and built — web apps, tools, and
          experiments.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="mt-10 grid gap-6 grid-cols-1">
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
