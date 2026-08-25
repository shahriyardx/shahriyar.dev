"use client"

import Link from "next/link"
import { trpc } from "@/lib/trpc/client"
import { ProjectCard } from "@/components/project-card"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/page-header"

export function FeaturedProjects() {
  const { data: projects = [] } = trpc.project.list.useQuery()

  if (projects.length === 0) return null

  return (
    <Section id="projects">
      <SectionHeader eyebrow="Work" title="Recent work">
        A selection of projects I&apos;ve built recently.
      </SectionHeader>

      <div className="mt-10 grid grid-cols-1 gap-6">
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
