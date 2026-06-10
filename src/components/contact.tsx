"use client"

import { useState } from "react"
import {
  Envelope,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Section, SectionLabel } from "@/components/section"

const socialLinks = [
  { icon: GithubLogo, href: "https://github.com/shahriyardx", label: "GitHub" },
  { icon: LinkedinLogo, href: "https://www.linkedin.com/in/devshahriyar/", label: "LinkedIn" },
  { icon: XLogo, href: "https://x.com/shahriyardx", label: "X" },
]

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const send = trpc.contact.create.useMutation({
    onSuccess: () => {
      setSent(true)
      setName("")
      setEmail("")
      setMessage("")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send.mutate({ name, email, message })
  }

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
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
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

        {sent ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-8 text-center">
            <p className="font-medium">Message sent!</p>
            <p className="text-sm text-muted-foreground">Thanks for reaching out. I&apos;ll get back to you soon.</p>
            <Button variant="outline" size="sm" onClick={() => setSent(false)}>Send another</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell me about your project..." rows={5} required />
            </div>
            <Button type="submit" className="self-start" disabled={send.isPending}>
              {send.isPending ? "Sending..." : "Send message"}
            </Button>
          </form>
        )}
      </div>
    </Section>
  )
}
