"use client"

import { ArrowUp, GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: GithubLogo, href: "https://github.com/shahriyardx", label: "GitHub" },
  {
    icon: LinkedinLogo,
    href: "https://www.linkedin.com/in/devshahriyar/",
    label: "LinkedIn",
  },
  { icon: XLogo, href: "https://x.com/shahriyardx", label: "X" },
]

const PROMPT = "#4ADE80"

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="text-sm">
          <span style={{ color: PROMPT }} aria-hidden="true">
            ❯{" "}
          </span>
          <span className="text-muted-foreground">exit</span>
        </p>

        <div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="text-muted-foreground/50"># </span>
            &copy; {new Date().getFullYear()} shahriyar.dev — built with
            Next.js, deployed on a whim.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon size={16} />
              </a>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
