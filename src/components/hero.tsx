"use client"

import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

export function Hero() {
  return (
    <Section className="flex items-center pt-28 pb-0 md:pt-36">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Full-Stack Developer
          </span>
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] tracking-tight">
            Build things for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
              the web
            </span>
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
            I craft performant, accessible digital experiences with modern web
            technologies. Focused on clean code and thoughtful design.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
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
    </Section>
  )
}
