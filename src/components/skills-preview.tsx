import { Section } from "@/components/section"
import { SectionHeader } from "@/components/page-header"

interface SkillCategory {
  label: string
  items: string[]
}

const categories: SkillCategory[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Rust"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "Framer Motion",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "tRPC", "FastAPI", "Django"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Drizzle"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    label: "Tools",
    items: ["Docker", "Linux", "Git / GitHub", "Firebase", "Stripe"],
  },
]

export function SkillsPreview() {
  return (
    <Section id="skills">
      <SectionHeader eyebrow="Stack" title="Things I work with">
        Technologies I use daily and reach for when building.
      </SectionHeader>

      <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-3">
            <dt className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60 uppercase">
              {cat.label}
            </dt>
            <dd className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {cat.items.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
