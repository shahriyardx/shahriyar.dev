import Image from "next/image"
import Link from "next/link"
import {
  ArrowCounterClockwise,
  BookmarkSimple,
  Clock as ClockIcon,
  DownloadSimple,
  GithubLogo,
  ImageSquare,
  ListChecks,
  MagnifyingGlass,
  ShieldCheck,
  Terminal,
} from "@phosphor-icons/react/dist/ssr"
import { BrowserFrame, IRIS, REPO, STORE } from "./dx-home-chrome"
import { Clock } from "./clock"

/** Frosted panel — the extension's own glass surface. */
const GLASS =
  "rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl"

/** What the command bar actually understands. */
const commandExamples = [
  { input: "2+3*4", hint: "= 14 · Enter copies" },
  { input: "!gh react", hint: "search GitHub" },
  { input: "!npm zod", hint: "search npm" },
  { input: "!mdn fetch", hint: "search MDN" },
  { input: ":3000", hint: "open your dev server" },
  { input: "localhost:5173", hint: "straight to the port" },
]

/** The shortcut tiles, doubling as the feature list. */
const shortcuts = [
  { icon: MagnifyingGlass, label: "Command bar" },
  { icon: Terminal, label: "Dev servers" },
  { icon: BookmarkSimple, label: "Bookmarks" },
  { icon: ListChecks, label: "Tasks" },
  { icon: ArrowCounterClockwise, label: "Recent tabs" },
  { icon: ImageSquare, label: "Backgrounds" },
  { icon: ClockIcon, label: "Clock" },
]

/** Rendered as the right-hand Tasks panel, because that panel is the product. */
const features = [
  {
    title: "Command bar",
    body: "Search the web, or jump straight to a domain. Calculate, search GitHub, npm or MDN, open a dev server. A hint under the bar says what Enter will do.",
  },
  {
    title: "Dev servers",
    body: "Lists the HTTP servers running on your machine, named after each app. Databases can't appear — only things that speak HTTP.",
  },
  {
    title: "Tasks",
    body: "A todo list with deadlines and a calendar view. Right-click any text or link to capture one.",
  },
  {
    title: "Reading list",
    body: "Save from the sidepanel or the right-click menu, mark as read, filter what's left.",
  },
  {
    title: "Recent tabs",
    body: "Recently closed tabs, so you never lose one.",
  },
  {
    title: "Backgrounds",
    body: "Presets, or right-click any image on the web to make it yours.",
  },
]

const backgrounds = [
  { src: "/apps/dx-home/bg-aurora.jpg", label: "Aurora" },
  { src: "/apps/dx-home/bg-ocean.jpg", label: "Ocean" },
  { src: "/apps/dx-home/bg-forest.jpg", label: "Forest" },
  { src: "/apps/dx-home/bg-sunset.jpg", label: "Sunset" },
  { src: "/apps/dx-home/bg-peaks.jpg", label: "Peaks" },
]

const stack = [
  "React 19",
  "TypeScript",
  "WXT",
  "Tailwind v4",
  "shadcn/ui",
  "Dexie (IndexedDB)",
  "Bun",
  "Chrome MV3",
  "Firefox",
]

export function DxHome() {
  return (
    <BrowserFrame active="/apps/dx-home">
      {/* The new tab itself */}
      <div className="relative">
        <Image
          src="/apps/dx-home/wallpaper.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#080B14]/55" />

        <main className="relative">
          <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              {/* Left panel — clock, command bar, shortcuts */}
              <div className="flex flex-col gap-6">
                <Clock />

                <h1 className="max-w-md text-2xl font-bold tracking-tight text-white md:text-3xl">
                  A quieter new tab, built for developers.
                </h1>
                <p className="-mt-3 max-w-md text-sm leading-relaxed text-white/60">
                  A clock, a command bar that does more than search, your
                  shortcuts, tasks and reading list — over a wallpaper you
                  choose. No account. No ads. No paywall. No analytics.
                </p>

                {/* Command bar */}
                <div className="flex flex-col gap-3">
                  <div
                    className={`flex items-center gap-3 px-4 py-3.5 ${GLASS}`}
                  >
                    <MagnifyingGlass
                      size={16}
                      className="shrink-0 text-white/40"
                    />
                    <span className="text-sm text-white/40">
                      Search or Enter address
                    </span>
                    <span
                      className="ml-auto h-4 w-px animate-pulse bg-white/50"
                      aria-hidden="true"
                    />
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {commandExamples.map((c) => (
                      <li
                        key={c.input}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 backdrop-blur-sm"
                      >
                        <code className="font-mono text-[11px] text-white/90">
                          {c.input}
                        </code>
                        <span className="text-[10px] text-white/40">
                          {c.hint}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shortcut tiles */}
                <div className="flex flex-wrap gap-2">
                  {shortcuts.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur-xl"
                    >
                      <s.icon size={14} style={{ color: IRIS }} />
                      <span className="text-xs text-white/75">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Recent-tabs-style links */}
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                    Get it
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={STORE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-[#0A0E1A] transition-opacity hover:opacity-90"
                      style={{ backgroundColor: IRIS }}
                    >
                      <DownloadSimple size={14} weight="bold" />
                      Add to Chrome
                    </a>
                    <a
                      href={REPO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm text-white/80 transition-colors hover:text-white ${GLASS} rounded-lg`}
                    >
                      <GithubLogo size={14} />
                      View source
                    </a>
                  </div>
                </div>
              </div>

              {/* Right panel — the Tasks panel, carrying the features */}
              <aside className={`flex flex-col gap-3 p-4 ${GLASS}`}>
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-sm font-semibold text-white">Features</h2>
                  <span className="text-[10px] text-white/35">
                    {features.length} items
                  </span>
                </div>

                {features.map((f) => (
                  <article
                    key={f.title}
                    className="rounded-xl border border-white/[0.08] bg-black/25 p-3"
                  >
                    <h3 className="text-sm font-medium text-white">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">
                      {f.body}
                    </p>
                  </article>
                ))}
              </aside>
            </div>
          </section>

          {/* Below the fold — still on the wallpaper, still glass */}
          <section className="mx-auto max-w-6xl px-5 pb-14">
            <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
              <div className={`flex flex-col gap-4 p-5 ${GLASS}`}>
                <h2 className="text-sm font-semibold text-white">
                  Pick a view
                </h2>
                <p className="-mt-2 text-xs text-white/50">
                  Ships with presets — or right-click any image on the web.
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {backgrounds.map((bg) => (
                    <figure key={bg.src} className="flex flex-col gap-1.5">
                      <Image
                        src={bg.src}
                        alt={`${bg.label} preset background`}
                        width={480}
                        height={300}
                        sizes="140px"
                        className="h-auto w-full rounded-lg border border-white/10"
                      />
                      <figcaption className="text-[10px] text-white/40">
                        {bg.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className={`flex flex-col gap-3 p-5 ${GLASS}`}>
                <h2 className="text-sm font-semibold text-white">Built with</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-white/10 bg-black/20 px-2 py-1 font-mono text-[10px] text-white/60"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* The real thing */}
          <section className="mx-auto max-w-6xl px-5 pb-14">
            <div className={`overflow-hidden p-2 ${GLASS}`}>
              <Image
                src="/apps/dx-home/dx-home-newtab.png"
                alt="The DxHome new tab: a large clock over a blue and violet wallpaper, a command bar, shortcut icons, recently closed tabs, and a tasks panel down the right side"
                width={1280}
                height={800}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </section>

          {/* Privacy */}
          <section className="mx-auto max-w-6xl px-5 pb-16">
            <div className={`flex flex-col items-start gap-4 p-6 ${GLASS}`}>
              <ShieldCheck size={20} style={{ color: IRIS }} weight="bold" />
              <h2 className="text-lg font-semibold text-white">
                Your new tab is nobody else&rsquo;s business
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/55">
                No account, no ads, no analytics, no tracking. Bookmarks, tasks,
                reading list and settings live in your browser&rsquo;s own
                storage. Dev-server detection only ever touches localhost, and
                only if you turn it on.
              </p>
              <Link
                href="/apps/dx-home/privacy"
                className="text-sm underline-offset-4 transition-opacity hover:underline hover:opacity-80"
                style={{ color: IRIS }}
              >
                Read the privacy policy →
              </Link>
            </div>
          </section>
        </main>
      </div>
    </BrowserFrame>
  )
}
