"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PROMPT } from "@/components/terminal"
import type { FsDir } from "@/lib/shell/fs"
import { HOME, prettyPath } from "@/lib/shell/fs"
import { complete, type Line, run } from "@/lib/shell/run"

interface Entry extends Line {
  id: number
}

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

const CHIPS = ["help", "ls apps", "cat about.txt", "tree stack", "neofetch"]

/** A prompt line inside the session. */
function Line({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm">
      <span style={{ color: PROMPT }} aria-hidden="true">
        ❯{" "}
      </span>
      <span className="text-muted-foreground">{children}</span>
    </p>
  )
}

export function TerminalHero({ fs }: { fs: FsDir }) {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[]>([])
  const [value, setValue] = useState("")
  const [cwd, setCwd] = useState(HOME)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const nextId = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const push = useCallback((lines: Line[]) => {
    setEntries((prev) => [
      ...prev,
      ...lines.map((l) => ({ ...l, id: nextId.current++ })),
    ])
  }, [])

  // Follow new output, but only once there is some — never on first paint.
  useEffect(() => {
    if (entries.length) endRef.current?.scrollIntoView({ block: "nearest" })
  }, [entries.length])

  const submit = (raw: string) => {
    push([{ kind: "input", text: raw }])
    const trimmed = raw.trim()
    if (!trimmed) return

    setHistory((h) => [trimmed, ...h])
    setHistoryIndex(-1)

    if (trimmed === "history") {
      push(
        history.length
          ? history
              .slice()
              .reverse()
              .map((h, i) => ({
                kind: "output" as const,
                text: `  ${String(i + 1).padStart(3)}  ${h}`,
              }))
          : [{ kind: "muted", text: "no history yet" }],
      )
      return
    }

    const result = run(trimmed, fs, cwd)

    if (result.clear) setEntries([])
    if (result.lines.length && !result.clear) push(result.lines)
    if (result.cwd) setCwd(result.cwd)

    if (result.navigate) {
      const href = result.navigate
      if (href.startsWith("http")) {
        window.open(href, "_blank", "noopener,noreferrer")
      } else {
        setTimeout(() => router.push(href), 320)
      }
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(value)
      setValue("")
      return
    }

    if (e.key === "Tab") {
      e.preventDefault()
      const completed = complete(value, fs, cwd)
      if (completed) setValue(completed)
      return
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setEntries([])
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!history.length) return
      const i = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(i)
      setValue(history[i])
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const i = historyIndex - 1
      if (i < 0) {
        setHistoryIndex(-1)
        setValue("")
        return
      }
      setHistoryIndex(i)
      setValue(history[i])
    }
  }

  return (
    <section className="relative overflow-hidden border-b">
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
              shahriyar@dev — {prettyPath(cwd)} — zsh
            </span>
          </div>

          {/* Clicking dead space focuses the prompt, the way a terminal does */}
          <div
            className="cursor-text"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) inputRef.current?.focus()
            }}
          >
            <div className="max-h-[40rem] overflow-y-auto p-5 md:p-8">
              {/* The session everyone lands on — plain markup, so it's here for
                  search engines and with JS off. */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Line>whoami</Line>
                  <h1 className="text-[clamp(2rem,6.5vw,3.75rem)] leading-[0.95] font-black tracking-tight">
                    Md Shahriyar Alam
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    full-stack developer
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Line>cat ./about.txt</Line>
                  <p className="max-w-xl leading-relaxed">
                    I craft performant, accessible digital experiences with
                    modern web technologies — and ship small tools that stay out
                    of your way.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Line>ls ./stack</Line>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                    {stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Anything typed lands here */}
              {entries.length > 0 && (
                <output className="mt-6 flex flex-col gap-1 text-sm">
                  {entries.map((entry) => (
                    <p
                      key={entry.id}
                      className={
                        entry.kind === "muted"
                          ? "text-muted-foreground"
                          : entry.kind === "error"
                            ? "text-[#F87171]"
                            : entry.kind === "accent"
                              ? "text-[#4ADE80]"
                              : "text-foreground"
                      }
                    >
                      {entry.kind === "input" ? (
                        <>
                          <span style={{ color: PROMPT }} aria-hidden="true">
                            ❯{" "}
                          </span>
                          {entry.text}
                        </>
                      ) : (
                        <span className="font-mono whitespace-pre-wrap">
                          {entry.text}
                        </span>
                      )}
                    </p>
                  ))}
                </output>
              )}

              {/* Live prompt */}
              <div className="mt-6 flex items-center gap-2 text-sm">
                <span style={{ color: PROMPT }} aria-hidden="true">
                  ❯
                </span>
                <label htmlFor="shell" className="sr-only">
                  Terminal — type a command, try help
                </label>
                <input
                  id="shell"
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  placeholder="help"
                  className="flex-1 bg-transparent font-mono text-foreground caret-[#4ADE80] outline-none placeholder:text-muted-foreground/40"
                />
              </div>
              <div ref={endRef} />
            </div>
          </div>
        </div>

        {/* For the mouse */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">try:</span>
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                submit(c)
                inputRef.current?.focus()
              }}
              className="border bg-muted/30 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {c}
            </button>
          ))}
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
