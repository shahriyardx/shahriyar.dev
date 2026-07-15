import Image from "next/image"
import Link from "next/link"
import { DownloadSimple, GithubLogo } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export const REPO = "https://github.com/shahriyardx/dx-home"
export const STORE =
  "https://chromewebstore.google.com/detail/dxhome/gecffmhnbgcpikfhofgpcbddhhfnoffd"

// DxHome brand — the icon's neon blue/violet glow over a midnight surface.
export const MIDNIGHT = "#0A0E1A"
export const IRIS = "#6E8BFF"
export const VIOLET = "#8B5CF6"

export function DxHomeHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#6E8BFF]/15 bg-[#0A0E1A]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/apps/dx-home" className="flex items-center gap-2.5">
          <Image
            src="/apps/dx-home/icon.png"
            alt="DxHome logo"
            width={28}
            height={28}
            className="size-7 rounded-md"
          />
          <span className="text-sm font-bold tracking-tight text-white">
            DxHome
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="hidden text-[#6E8BFF]/70 transition-colors hover:text-[#6E8BFF] sm:block"
          >
            <GithubLogo size={18} />
          </a>
          <Button
            size="sm"
            asChild
            className="bg-[#6E8BFF] text-[#0A0E1A] hover:bg-[#6E8BFF]/90"
          >
            <a href={STORE} target="_blank" rel="noopener noreferrer">
              <DownloadSimple size={14} weight="bold" />
              Install
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export function DxHomeFooter() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: MIDNIGHT, borderColor: "#6E8BFF22" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm" style={{ color: `${IRIS}b3` }}>
          DxHome — a quieter new tab for Chrome and Firefox.
        </p>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/apps/dx-home/privacy"
            className="text-white/80 transition-colors hover:text-white"
          >
            Privacy
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
          >
            <GithubLogo size={15} /> Source
          </a>
          <a
            href={STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            style={{ color: IRIS }}
          >
            <DownloadSimple size={15} weight="bold" /> Chrome Web Store
          </a>
        </div>
      </div>
    </footer>
  )
}
