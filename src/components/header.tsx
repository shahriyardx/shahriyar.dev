"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { List, X, SignOut } from "@phosphor-icons/react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { TerminalLogo } from "@/components/terminal-logo"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/apps", label: "Apps" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<{ role?: string } | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data) setUser(data.user as { role?: string })
      setLoaded(true)
    })
  }, [])

  const isAdmin = user?.role === "admin"

  const handleLogout = async () => {
    await authClient.signOut()
    setUser(null)
    router.push("/")
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <TerminalLogo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <span className="mr-1 text-muted-foreground/30">//</span>
                )}
                {link.label}
              </Link>
            )
          })}
          {loaded && isAdmin && (
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
          )}
          {loaded && user ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <SignOut size={14} className="mr-1" />
              Logout
            </Button>
          ) : (
            <Button size="sm" asChild>
              <a href="/contact">Get in touch</a>
            </Button>
          )}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              {open ? <X size={18} /> : <List size={18} />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-6">
            <nav className="mt-12 flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href + "/")
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <span className="mr-1 text-muted-foreground/30">//</span>
                    )}
                    {link.label}
                  </Link>
                )
              })}
              {loaded && isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="text-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              )}
              {loaded && user ? (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                >
                  <SignOut size={14} className="mr-1" />
                  Logout
                </Button>
              ) : (
                <Button className="mt-4 w-full" asChild>
                  <a href="/contact" onClick={() => setOpen(false)}>
                    Get in touch
                  </a>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
