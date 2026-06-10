"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

export function CTASection() {
  return (
    <Section>
      <div className="flex flex-col items-center gap-6 border p-12 text-center md:p-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Let&apos;s build something together
        </h2>
        <p className="max-w-md text-muted-foreground">
          Have a project in mind or just want to chat? I&apos;m always open to
          new opportunities.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">
            Get in touch
            <ArrowRight size={16} weight="bold" />
          </Link>
        </Button>
      </div>
    </Section>
  )
}
