"use client"

import {
  Envelope,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Section, SectionLabel } from "@/components/section"

const socialLinks = [
  { icon: GithubLogo, href: "#", label: "GitHub" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
  { icon: XLogo, href: "#", label: "X" },
]

export function Contact() {
  return (
    <Section id="contact">
      <SectionLabel>Contact</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a project in mind or just want to chat? Drop me a message and
            I&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Button key={link.label} variant="outline" size="icon" asChild>
                <a href={link.href} aria-label={link.label}>
                  <link.icon size={16} />
                </a>
              </Button>
            ))}
          </div>
          <a
            href="mailto:hello@shahriyar.dev"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Envelope size={14} />
            hello@shahriyar.dev
          </a>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Tell me about your project..."
              rows={5}
            />
          </div>
          <Button type="submit" className="self-start">
            Send message
          </Button>
        </form>
      </div>
    </Section>
  )
}
