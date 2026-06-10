"use client"

import {
  SiDocker,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Section, SectionLabel } from "@/components/section"

const skills: { name: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Redis", icon: SiRedis },
  { name: "Prisma", icon: SiPrisma },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Linux", icon: SiLinux },
  { name: "Git", icon: SiGit },
  { name: "NGINX", icon: SiNginx },
]

export function SkillsPreview() {
  return (
    <Section id="skills">
      <SectionLabel>Skills</SectionLabel>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Things I work with
        </h2>
        <p className="max-w-lg text-muted-foreground">
          Technologies I use daily and reach for when building.
        </p>
      </div>

      <TooltipProvider delayDuration={200}>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <Tooltip key={skill.name}>
              <TooltipTrigger asChild>
                <button
                  className="flex size-12 items-center justify-center border bg-muted/30 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  aria-label={skill.name}
                >
                  <skill.icon size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{skill.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </Section>
  )
}
