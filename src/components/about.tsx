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
    </Section>
  )
}
