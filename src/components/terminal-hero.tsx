import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { Cmd, Cursor, PROMPT } from "@/components/terminal"

const stack = [
  "typescript",
  "react",
  "next.js",
  "node",
  "python",
  "rust",
  "postgres",
  "docker",
]

export function TerminalHero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Faint grid + glow behind the window */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* Same gutter as <Section>, so the window lines up with everything below */}
      <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="overflow-hidden rounded-xl border bg-card shadow-2xl shadow-black/40">
          {/* Title bar */}
          <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-2.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-3 rounded-full bg-[#FF5F57]" />
              <span className="size-3 rounded-full bg-[#FEBC2E]" />
              <span className="size-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="mx-auto pr-6 text-xs text-muted-foreground">
              shahriyar@dev — ~/portfolio — zsh
            </span>
          </div>

          {/* Session */}
          <div className="flex flex-col gap-6 p-5 md:p-8">
            <div className="flex flex-col gap-2">
              <Cmd>whoami</Cmd>
              <h1 className="text-[clamp(2rem,6.5vw,3.75rem)] leading-[0.95] font-black tracking-tight">
                Md Shahriyar Alam
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                full-stack developer
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Cmd>cat ./about.txt</Cmd>
              <p className="max-w-xl leading-relaxed">
                I craft performant, accessible digital experiences with modern
                web technologies — and ship small tools that stay out of your
                way.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Cmd>ls ./stack</Cmd>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                {stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            <p className="text-sm" aria-hidden="true">
              <span style={{ color: PROMPT }}>❯ </span>
              <Cursor />
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            size="lg"
            asChild
            className="transition-all duration-300 hover:scale-105"
          >
            <Link href="/resume">
              Resume
              <ArrowRight size={16} weight="bold" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
