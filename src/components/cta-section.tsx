import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { Cursor, PROMPT } from "@/components/terminal"

export function CTASection() {
  return (
    <Section>
      <div className="border p-8 md:p-12">
        <div className="flex flex-col gap-1 text-sm">
          <p>
            <span style={{ color: PROMPT }} aria-hidden="true">
              ❯{" "}
            </span>
            <span className="text-muted-foreground">
              ./start-project --with shahriyar
            </span>
          </p>
          <p style={{ color: PROMPT }}>Ready when you are.</p>
        </div>

        <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
          Let&apos;s build something together
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Have a project in mind or just want to chat? I&apos;m always open to
          new opportunities.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact">
              Get in touch
              <ArrowRight size={16} weight="bold" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/resume">Resume</Link>
          </Button>
        </div>

        <p className="mt-8 text-sm" aria-hidden="true">
          <span style={{ color: PROMPT }}>❯ </span>
          <Cursor />
        </p>
      </div>
    </Section>
  )
}
