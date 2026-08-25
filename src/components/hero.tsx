import Link from "next/link"
import { Eyebrow } from "@/components/page-header"

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "Python",
  "Rust",
  "Postgres",
  "Docker",
]

export function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20 md:pt-44 md:pb-28">
        <Eyebrow>Full-stack developer</Eyebrow>

        <h1 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
          Md Shahriyar Alam builds{" "}
          <em className="font-normal">fast, accessible</em> software for the
          web.
        </h1>

        <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
          Five years of shipping web apps — and small tools that stay out of
          your way.
        </p>

        <div className="mt-10 flex flex-wrap gap-6 text-sm">
          <Link
            href="/contact"
            className="border-b border-foreground/40 pb-0.5 transition-colors hover:border-foreground"
          >
            Get in touch
          </Link>
          <Link
            href="/resume"
            className="border-b border-transparent pb-0.5 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            Resume
          </Link>
        </div>

        <p className="mt-16 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-muted-foreground/70">
          {stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
      </div>
    </section>
  )
}
