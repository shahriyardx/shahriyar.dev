import {
  SiDjango,
  SiDocker,
  SiDrizzle,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFramer,
  SiGit,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiRust,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
} from "react-icons/si"
import { Section } from "@/components/section"
import { Cmd } from "@/components/terminal"

interface Skill {
  name: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

interface SkillCategory {
  dir: string
  items: Skill[]
}

const categories: SkillCategory[] = [
  {
    dir: "languages",
    items: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
      { name: "Rust", icon: SiRust },
    ],
  },
  {
    dir: "frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    dir: "backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "tRPC", icon: SiTrpc },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Django", icon: SiDjango },
    ],
  },
  {
    dir: "databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Prisma", icon: SiPrisma },
      { name: "Drizzle", icon: SiDrizzle },
    ],
  },
  {
    dir: "mobile",
    items: [
      { name: "React Native", icon: SiReact },
      { name: "Expo", icon: SiExpo },
    ],
  },
  {
    dir: "tools",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Linux", icon: SiLinux },
      { name: "Git / GitHub", icon: SiGit },
      { name: "Firebase", icon: SiFirebase },
      { name: "Stripe", icon: SiStripe },
    ],
  },
]

const fileCount = categories.reduce((n, c) => n + c.items.length, 0)

/** Box-drawing glyphs, exactly as `tree` prints them. */
function Glyph({ children }: { children: string }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 whitespace-pre text-muted-foreground/30"
    >
      {children}
    </span>
  )
}

export function SkillsPreview() {
  return (
    <Section id="skills">
      <div className="flex flex-col gap-4">
        <Cmd>tree ./stack</Cmd>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Things I work with
        </h2>
        <p className="max-w-lg text-muted-foreground">
          Technologies I use daily and reach for when building.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto border bg-muted/20 p-5 md:p-6">
        <div className="min-w-max text-sm">
          <p className="text-muted-foreground">./stack</p>

          {categories.map((cat, ci) => {
            const lastDir = ci === categories.length - 1
            return (
              <div key={cat.dir}>
                <p className="flex items-center">
                  <Glyph>{lastDir ? "└── " : "├── "}</Glyph>
                  <span className="font-semibold tracking-tight">
                    {cat.dir}/
                  </span>
                </p>

                {cat.items.map((skill, si) => {
                  const lastItem = si === cat.items.length - 1
                  return (
                    <p
                      key={skill.name}
                      className="group flex items-center py-0.5"
                    >
                      <Glyph>{lastDir ? "    " : "│   "}</Glyph>
                      <Glyph>{lastItem ? "└── " : "├── "}</Glyph>
                      <skill.icon
                        size={14}
                        className="mr-2 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                      />
                      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                        {skill.name}
                      </span>
                    </p>
                  )
                })}
              </div>
            )
          })}

          <p className="mt-4 text-xs text-muted-foreground/60">
            {categories.length} directories, {fileCount} files
          </p>
        </div>
      </div>
    </Section>
  )
}
