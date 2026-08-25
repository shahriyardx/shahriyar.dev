import Link from "next/link"
import { Section } from "@/components/section"
import { Eyebrow } from "@/components/page-header"

export function CTASection() {
  return (
    <Section>
      <div className="border p-8 md:p-12">
        <Eyebrow>Contact</Eyebrow>

        <h2 className="mt-4 max-w-xl text-2xl font-medium tracking-tight md:text-3xl">
          Let&apos;s build something together
        </h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Have a project in mind or just want to chat? I&apos;m always open to
          new opportunities.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
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
      </div>
    </Section>
  )
}
