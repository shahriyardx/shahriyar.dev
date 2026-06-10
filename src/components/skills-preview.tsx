"use client"

import {
  SiBootstrap,
  SiCss,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedux,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Section, SectionLabel } from "@/components/section"

interface Skill {
  name: string
  icon: React.ComponentType<{ size?: number }>
}

interface SkillCategory {
  label: string
  items: Skill[]
}

const categories: SkillCategory[] = [
  {
    label: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Bootstrap", icon: SiBootstrap },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Django", icon: SiDjango },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Linux", icon: SiLinux },
      { name: "Git / GitHub", icon: SiGit },
    ],
  },
  {
    label: "Platforms & Services",
    items: [
      { name: "Firebase", icon: SiFirebase },
      { name: "Stripe", icon: SiStripe },
    ],
  },
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

      <div className="mt-8 flex flex-col gap-6">
        {categories.map((cat) => (
          <div key={cat.label}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <Tooltip key={skill.name}>
                  <TooltipTrigger asChild>
                    <button
                      className="flex items-center gap-2 border bg-muted/30 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                      aria-label={skill.name}
                    >
                      <skill.icon size={16} />
                      {skill.name}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{skill.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
