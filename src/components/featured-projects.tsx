"use client"

import Link from "next/link"
import { trpc } from "@/lib/trpc/client"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"

export function FeaturedProjects() {
  const { data: projects = [] } = trpc.project.list.useQuery()

  if (projects.length === 0) return null

  return (
    <Section id="projects">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Recent work
        </h2>
        <p className="max-w-lg text-muted-foreground">
          A selection of projects I&apos;ve built recently.
        </p>
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      {projects.length > 3 && (
        <Link
          href="/projects"
          className="mt-8 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See all projects →
        </Link>
      )}
    </Section>
  )
}
