import Image from "next/image"
import Link from "next/link"

export const REPO = "https://github.com/shahriyardx/dx-home"
export const STORE =
  "https://chromewebstore.google.com/detail/dxhome/gecffmhnbgcpikfhofgpcbddhhfnoffd"

// DxHome brand — the icon's neon blue/violet glow.
export const IRIS = "#6E8BFF"
export const VIOLET = "#8B5CF6"

// Browser UI, not DxHome's own palette — this is the frame around it.
const UI = "#1F1F23"
const UI_EDGE = "#35363A"
const UI_TAB = "#2E2F33"
const UI_BAR = "#3A3B40"

const tabs = [
  { href: "/apps/dx-home", label: "New Tab", url: "dxhome://newtab" },
  {
    href: "/apps/dx-home/privacy",
    label: "Privacy",
    url: "dxhome://privacy",
  },
]

/**
 * The page sits inside a browser window, because the product replaces one.
 * `active` picks which tab is foregrounded and what the address bar reads.
 */
export function BrowserFrame({
  active,
  children,
}: {
  active: "/apps/dx-home" | "/apps/dx-home/privacy"
  children: React.ReactNode
}) {
  const current = tabs.find((t) => t.href === active) ?? tabs[0]

  return (
    <div className="min-h-screen" style={{ backgroundColor: UI }}>
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: UI, borderColor: UI_EDGE }}
      >
        {/* Tab strip */}
        <div className="flex items-end gap-1 px-2 pt-2">
          {tabs.map((t) => {
            const isActive = t.href === active
            return (
              <Link
                key={t.href}
                href={t.href}
                className="group flex h-9 max-w-[200px] min-w-0 flex-1 items-center gap-2 rounded-t-lg px-3 text-xs transition-colors sm:flex-none sm:min-w-[180px]"
                style={{
                  backgroundColor: isActive ? UI_TAB : "transparent",
                  color: isActive ? "#E8EAED" : "#9AA0A6",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <Image
                  src="/apps/dx-home/favicon.png"
                  alt=""
                  width={14}
                  height={14}
                  className="size-3.5 shrink-0 rounded-sm"
                />
                <span className="truncate">{t.label}</span>
              </Link>
            )
          })}
          <span
            className="mb-1 hidden size-6 shrink-0 items-center justify-center rounded text-base sm:flex"
            style={{ color: "#9AA0A6" }}
            aria-hidden="true"
          >
            +
          </span>
        </div>

        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ backgroundColor: UI_TAB }}
        >
          <div
            className="hidden items-center gap-3 pr-1 text-sm sm:flex"
            style={{ color: "#9AA0A6" }}
            aria-hidden="true"
          >
            <span>←</span>
            <span>→</span>
            <span>⟳</span>
          </div>

          <div
            className="flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-1.5"
            style={{ backgroundColor: UI_BAR }}
          >
            <span
              className="text-[10px]"
              style={{ color: "#9AA0A6" }}
              aria-hidden="true"
            >
              ⌂
            </span>
            <span
              className="truncate font-mono text-xs"
              style={{ color: "#BDC1C6" }}
            >
              {current.url}
            </span>
          </div>

          <Image
            src="/apps/dx-home/icon.png"
            alt="DxHome extension icon"
            width={20}
            height={20}
            className="size-5 shrink-0 rounded"
          />
        </div>
      </header>

      {children}
    </div>
  )
}
