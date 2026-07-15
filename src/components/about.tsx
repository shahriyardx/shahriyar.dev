import { Section } from "@/components/section"
import { Cmd, Pane, PROMPT } from "@/components/terminal"

/** The ASCII mark neofetch prints beside the specs. */
const ASCII = `
   ▄▄▄▄▄▄▄▄▄▄▄
  █           █
  █   ▄▄▄▄▄   █
  █   █   █   █
  █   █▄▄▄█   █
  █           █
  █   ▄▄▄▄▄   █
  █           █
   ▀▀▀▀▀▀▀▀▀▀▀
`.trim()

const specs: { key: string; value: string }[] = [
  { key: "user", value: "shahriyar@dev" },
  { key: "role", value: "Full-stack developer" },
  { key: "uptime", value: "5+ years building" },
  { key: "os", value: "Arch Linux (Hyprland)" },
  { key: "editor", value: "Zed" },
  { key: "shell", value: "zsh + Oh My Zsh" },
  { key: "font", value: "Nerd Font" },
  { key: "browser", value: "Chrome" },
  { key: "git", value: "GitHub CLI" },
  { key: "api", value: "Bruno" },
  { key: "cpu", value: "Ryzen 7 7700" },
  { key: "gpu", value: "Intel Arc A380" },
  { key: "display", value: "LG 27UN880" },
  { key: "input", value: "MCHOSE GX87 · MX Master 4" },
  { key: "stack", value: "Next.js · TypeScript · Tailwind · Postgres" },
]

const stats = [
  { label: "years building", value: "5+" },
  { label: "technologies", value: "20+" },
  { label: "projects shipped", value: "30+" },
  { label: "happy clients", value: "15+" },
]

/** The colour bar neofetch ends on. */
const SWATCHES = [
  "#F87171",
  "#FBBF24",
  "#4ADE80",
  "#38BDF8",
  "#818CF8",
  "#C084FC",
  "#F472B6",
  "#E7E7F5",
]

export function About() {
  return (
    <Section id="about">
      <div className="flex flex-col gap-4">
        <Cmd>cat ./about.md</Cmd>
        <h1 className="text-[clamp(2rem,6vw,3.25rem)] leading-[0.95] font-black tracking-tight">
          Passionate about building
          <br />
          things that matter
        </h1>
      </div>

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

      {/* neofetch */}
      <div className="mt-16 flex flex-col gap-4">
        <Cmd>neofetch</Cmd>
        <Pane title="shahriyar@dev — ~ — zsh">
          <div className="flex flex-col gap-8 md:flex-row md:gap-10">
            <pre
              aria-hidden="true"
              className="shrink-0 text-[10px] leading-[1.15] md:text-xs"
              style={{ color: PROMPT }}
            >
              <code>{ASCII}</code>
            </pre>

            <dl className="min-w-0 flex-1 text-sm">
              <div className="mb-2">
                <span className="font-semibold" style={{ color: PROMPT }}>
                  shahriyar
                </span>
                <span className="text-muted-foreground">@</span>
                <span className="font-semibold" style={{ color: PROMPT }}>
                  dev
                </span>
                <p className="text-muted-foreground/40">—————————————</p>
              </div>

              {specs.map((s) => (
                <div key={s.key} className="flex gap-2 py-[3px]">
                  <dt
                    className="w-16 shrink-0 font-semibold"
                    style={{ color: PROMPT }}
                  >
                    {s.key}
                  </dt>
                  <dd className="min-w-0 text-muted-foreground">{s.value}</dd>
                </div>
              ))}

              <div className="mt-4 flex" aria-hidden="true">
                {SWATCHES.map((c) => (
                  <span
                    key={c}
                    className="h-4 w-6"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </dl>
          </div>
        </Pane>
      </div>

      {/* Stats, as command output */}
      <div className="mt-16 flex flex-col gap-4">
        <Cmd>wc -l ./career</Cmd>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 border p-5">
              <span className="text-3xl font-black tabular-nums">
                {s.value}
              </span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
