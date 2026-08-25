import Image from "next/image"
import { Section } from "@/components/section"
import { Eyebrow, PageHeader } from "@/components/page-header"

const specs: { key: string; value: string }[] = [
  { key: "Role", value: "Full-stack developer" },
  { key: "Experience", value: "5+ years building" },
  { key: "OS", value: "Arch Linux (Hyprland)" },
  { key: "Editor", value: "Zed" },
  { key: "Shell", value: "zsh + Oh My Zsh" },
  { key: "Font", value: "Nerd Font" },
  { key: "Browser", value: "Chrome" },
  { key: "Git", value: "GitHub CLI" },
  { key: "API client", value: "Bruno" },
  { key: "CPU", value: "Ryzen 7 7700" },
  { key: "GPU", value: "Intel Arc A380" },
  { key: "Display", value: "LG 27UN880" },
  { key: "Input", value: "MCHOSE GX87 · MX Master 4" },
  { key: "Stack", value: "Next.js · TypeScript · Tailwind · Postgres" },
]

const stats = [
  { label: "years building", value: "5+" },
  { label: "technologies", value: "20+" },
  { label: "projects shipped", value: "30+" },
  { label: "happy clients", value: "15+" },
]

export function About() {
  return (
    <Section id="about">
      <PageHeader eyebrow="About" title="Building things that matter" />

      <div className="mt-8 flex max-w-2xl flex-col gap-4 leading-relaxed text-muted-foreground">
        <p>
          I&apos;m a full-stack developer with deep experience in React, Next.js
          and modern TypeScript ecosystems. I focus on building fast,
          accessible, maintainable web applications.
        </p>
        <p>
          When I&apos;m not coding, I explore new technologies, contribute to
          open source, and write about what I learn.
        </p>
      </div>

      {/* Setup */}
      <div className="mt-16 flex flex-col gap-6">
        <Eyebrow>Setup</Eyebrow>
        <div className="flex flex-col gap-10 border p-6 md:flex-row md:gap-12 md:p-8">
          <Image
            src="/portrait.svg"
            alt="Md Shahriyar Alam, drawn as dotted line art"
            width={624}
            height={624}
            unoptimized
            className="w-40 shrink-0 self-center text-foreground md:w-48 md:self-start"
          />

          <dl className="min-w-0 flex-1 columns-1 gap-10 text-sm sm:columns-2">
            {specs.map((s) => (
              <div
                key={s.key}
                className="flex break-inside-avoid justify-between gap-4 border-b py-2 last:border-b-0"
              >
                <dt className="shrink-0 text-muted-foreground/60">{s.key}</dt>
                <dd className="min-w-0 text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 border p-5">
            <span className="text-2xl font-medium tabular-nums">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
