import Image from "next/image"
import Link from "next/link"
import { DownloadSimple, GithubLogo } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export const REPO = "https://github.com/shahriyardx/finx"
export const RELEASE = "https://github.com/shahriyardx/finx/releases/latest"

// Wise-inspired brand palette — scoped to the FinX pages.
export const LIME = "#9FE870"
export const FOREST = "#163300"

export function FinxHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#9FE870]/15 bg-[#0c1f00]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/apps/finx" className="flex items-center gap-2.5">
          <Image
            src="/apps/finx/icon.png"
            alt="FinX logo"
            width={28}
            height={28}
            className="size-7 rounded-md"
          />
          <span className="text-sm font-bold tracking-tight text-white">
            FinX
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="hidden text-[#9FE870]/70 transition-colors hover:text-[#9FE870] sm:block"
          >
            <GithubLogo size={18} />
          </a>
          <Button
            size="sm"
            asChild
            className="bg-[#9FE870] text-[#163300] hover:bg-[#9FE870]/90"
          >
            <a href={RELEASE} target="_blank" rel="noopener noreferrer">
              <DownloadSimple size={14} weight="bold" />
              Download
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export function FinxFooter() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: FOREST, borderColor: "#9FE87022" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm" style={{ color: `${LIME}b3` }}>
          FinX — local-only finance for Android.
        </p>
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/apps/finx/privacy"
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
            href={RELEASE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            style={{ color: LIME }}
          >
            <DownloadSimple size={15} weight="bold" /> Latest release
          </a>
        </div>
      </div>
    </footer>
  )
}
