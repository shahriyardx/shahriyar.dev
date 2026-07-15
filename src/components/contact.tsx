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
import { Cmd, Pane, PROMPT } from "@/components/terminal"

const socialLinks = [
  { icon: GithubLogo, href: "https://github.com/shahriyardx", label: "GitHub" },
  {
    icon: LinkedinLogo,
    href: "https://www.linkedin.com/in/devshahriyar/",
    label: "LinkedIn",
  },
  { icon: XLogo, href: "https://x.com/shahriyardx", label: "X" },
]

/** Field label styled as a flag being passed to `mail`. */
function Flag({
  htmlFor,
  flag,
  children,
}: {
  htmlFor: string
  flag: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-xs">
      <span style={{ color: PROMPT }} className="font-semibold">
        {flag}
      </span>
      <span className="text-muted-foreground">{children}</span>
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
      <div className="flex flex-col gap-4">
        <Cmd>mail -s &quot;hello&quot; shahriyar@dev</Cmd>
        <h1 className="text-[clamp(2rem,6vw,3.25rem)] leading-[0.95] font-black tracking-tight">
          Let&apos;s work together
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Have a project in mind or just want to chat? Drop me a message and
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        {/* Composer */}
        <Pane title="compose — mail — zsh">
          {sent ? (
            <div className="flex flex-col gap-2 text-sm">
              <p>
                <span style={{ color: PROMPT }} aria-hidden="true">
                  ❯{" "}
                </span>
                mail -s &quot;hello&quot; shahriyar@dev
              </p>
              <p style={{ color: PROMPT }}>Message sent. Exit status 0.</p>
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
                  <Flag htmlFor="name" flag="--from">
                    your name
                  </Flag>
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
                  <Flag htmlFor="email" flag="--reply-to">
                    your email
                  </Flag>
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
                <Flag htmlFor="message" flag="--body">
                  what&apos;s on your mind
                </Flag>
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
                <p className="text-sm text-[#F87171]">
                  mail: delivery failed — please try again.
                </p>
              )}
            </form>
          )}
        </Pane>

        {/* Contact card */}
        <div className="flex flex-col gap-4">
          <Cmd>cat ./contact.txt</Cmd>
          <div className="flex flex-col gap-4 border p-5">
            <a
              href="mailto:hello@shahriyar.dev"
              className="flex items-center gap-2 text-sm transition-colors hover:text-muted-foreground"
            >
              <Envelope size={14} style={{ color: PROMPT }} />
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
            # usually replies within a day
          </p>
        </div>
      </div>
    </Section>
  )
}
