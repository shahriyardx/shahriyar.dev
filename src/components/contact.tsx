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
import { Section } from "@/components/section"
import { PageHeader } from "@/components/page-header"

const socialLinks = [
  { icon: GithubLogo, href: "https://github.com/shahriyardx", label: "GitHub" },
  {
    icon: LinkedinLogo,
    href: "https://www.linkedin.com/in/devshahriyar/",
    label: "LinkedIn",
  },
  { icon: XLogo, href: "https://x.com/shahriyardx", label: "X" },
]

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="text-xs text-muted-foreground">
      {children}
    </label>
  )
}

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
      <PageHeader eyebrow="Contact" title="Let's work together">
        Have a project in mind or just want to chat? Drop me a message and
        I&apos;ll get back to you as soon as possible.
      </PageHeader>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        {/* Composer */}
        <div className="border p-5 md:p-6">
          {sent ? (
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Message sent.</p>
              <p className="text-muted-foreground">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 self-start"
                onClick={() => setSent(false)}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="name">Your name</FieldLabel>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    required
                    className="bg-muted/20"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="email">Your email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-muted/20"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="message">
                  What&apos;s on your mind
                </FieldLabel>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="bg-muted/20"
                />
              </div>

              <Button
                type="submit"
                className="self-start"
                disabled={send.isPending}
              >
                {send.isPending ? "Sending…" : "Send message"}
              </Button>

              {send.isError && (
                <p className="text-sm text-destructive">
                  Delivery failed — please try again.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Contact card */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 border p-5">
            <a
              href="mailto:hello@shahriyar.dev"
              className="flex items-center gap-2 text-sm transition-colors hover:text-muted-foreground"
            >
              <Envelope size={14} />
              hello@shahriyar.dev
            </a>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <link.icon size={14} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground/60">
            Usually replies within a day.
          </p>
        </div>
      </div>
    </Section>
  )
}
