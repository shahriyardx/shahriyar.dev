import { Section, SectionLabel } from "@/components/section"

const highlights = [
  { label: "Years building", value: "5+" },
  { label: "Technologies", value: "20+" },
  { label: "Projects shipped", value: "30+" },
  { label: "Happy clients", value: "15+" },
]

export function About() {
  return (
    <Section id="about">
      <SectionLabel>About</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Passionate about building things that matter
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I&apos;m a full-stack developer with deep experience in React,
            Next.js, and modern TypeScript ecosystems. I focus on building fast,
            accessible, and maintainable web applications.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When I&apos;m not coding, I explore new technologies, contribute to
            open source, and write about what I learn.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {highlights.map((h) => (
            <div key={h.label} className="flex flex-col gap-1 border p-5">
              <span className="text-3xl font-bold">{h.value}</span>
              <span className="text-xs text-muted-foreground">{h.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 grid gap-12 md:grid-cols-2">
        <div>
          <SectionLabel>Editor & Terminal</SectionLabel>
          <div className="flex flex-col gap-3">
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Editor</p>
              <p className="text-sm text-muted-foreground">Zed</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Terminal</p>
              <p className="text-sm text-muted-foreground">Oh My Zsh</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Font</p>
              <p className="text-sm text-muted-foreground">Nerd Font</p>
            </div>
          </div>
        </div>
        <div>
          <SectionLabel>Hardware</SectionLabel>
          <div className="flex flex-col gap-3">
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">PC</p>
              <p className="text-sm text-muted-foreground">Ryzen 7 7700 · Arc A380</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Monitor</p>
              <p className="text-sm text-muted-foreground">LG 27UN880</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Keyboard & Mouse</p>
              <p className="text-sm text-muted-foreground">MCHOSE GX87 · MX Master 4</p>
            </div>
          </div>
        </div>
        <div>
          <SectionLabel>Software</SectionLabel>
          <div className="flex flex-col gap-3">
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Browser</p>
              <p className="text-sm text-muted-foreground">Chrome</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Git</p>
              <p className="text-sm text-muted-foreground">GitHub CLI</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">API Client</p>
              <p className="text-sm text-muted-foreground">Bruno</p>
            </div>
          </div>
        </div>
        <div>
          <SectionLabel>Stack</SectionLabel>
          <div className="flex flex-col gap-3">
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Framework</p>
              <p className="text-sm text-muted-foreground">Next.js + TypeScript</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Styling</p>
              <p className="text-sm text-muted-foreground">Tailwind CSS v4 + shadcn/ui</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">Database</p>
              <p className="text-sm text-muted-foreground">PostgreSQL + Prisma</p>
            </div>
            <div className="border-l-2 px-4">
              <p className="text-sm font-medium">OS</p>
              <p className="text-sm text-muted-foreground">Arch Linux (Hyprland)</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
