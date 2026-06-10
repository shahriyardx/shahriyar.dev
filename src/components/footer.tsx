"use client"

import { ArrowUp, GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const socialLinks = [
  { icon: GithubLogo, href: "https://github.com/shahriyardx", label: "GitHub" },
  { icon: LinkedinLogo, href: "https://www.linkedin.com/in/devshahriyar/", label: "LinkedIn" },
  { icon: XLogo, href: "https://x.com/shahriyardx", label: "X" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} shahriyar.dev. All rights
            reserved.
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
            <Separator orientation="vertical" className="h-4" />
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
