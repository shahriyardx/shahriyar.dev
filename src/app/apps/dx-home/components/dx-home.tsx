import Image from "next/image"
import Link from "next/link"
import {
  ArrowCounterClockwise,
  BookmarkSimple,
  Clock,
  DownloadSimple,
  GithubLogo,
  ImageSquare,
  ListChecks,
  MagnifyingGlass,
  ShieldCheck,
  Terminal,
} from "@phosphor-icons/react/dist/ssr"
import {
  SiBun,
  SiFirefoxbrowser,
  SiGooglechrome,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Section, SectionLabel } from "@/components/section"
import {
  DxHomeFooter,
  DxHomeHeader,
  IRIS,
  MIDNIGHT,
  REPO,
  STORE,
} from "./dx-home-chrome"

const features = [
  {
    icon: MagnifyingGlass,
    title: "Command bar",
    body: "Search, or jump straight to a domain. Type 2+3*4 to calculate, !gh react to search GitHub, :3000 to open a dev server. A hint says what Enter will do.",
  },
  {
    icon: Terminal,
    title: "Dev servers",
    body: "Optionally lists the HTTP servers running on your machine, named after each app. Databases can't appear — only things that speak HTTP.",
  },
  {
    icon: BookmarkSimple,
    title: "Bookmarks",
    body: "Your top sites as shortcuts, plus any you add yourself.",
  },
  {
    icon: ListChecks,
    title: "Tasks",
    body: "A todo list with deadlines and a calendar view. Right-click any text or link to capture one.",
  },
  {
    icon: BookmarkSimple,
    title: "Reading list",
    body: "Save from the sidepanel or the right-click menu, mark as read, and filter what's left.",
  },
  {
    icon: ArrowCounterClockwise,
    title: "Recent tabs",
    body: "Recently closed tabs, so you never lose one.",
  },
  {
    icon: ImageSquare,
    title: "Backgrounds",
    body: "Pick a preset wallpaper, or right-click any image on the web to make it yours.",
  },
  {
    icon: Clock,
    title: "Clock",
    body: "Click it for a full-screen focus view.",
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
  { icon: SiReact, label: "React 19" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: Terminal, label: "WXT" },
  { icon: SiTailwindcss, label: "Tailwind v4" },
  { icon: SiShadcnui, label: "shadcn/ui" },
  { icon: ImageSquare, label: "Dexie (IndexedDB)" },
  { icon: SiBun, label: "Bun" },
  { icon: SiGooglechrome, label: "Chrome MV3" },
  { icon: SiFirefoxbrowser, label: "Firefox" },
]

export function DxHome() {
  return (
    <>
      <DxHomeHeader />

      <main id="top">
        {/* Hero */}
        <Section className="pt-28 pb-0 md:pt-36">
          <div className="relative">
            <div
              className="absolute inset-x-0 -top-24 -z-10 h-[420px] blur-3xl"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 40%, #6E8BFF33, transparent 70%)",
              }}
            />
            <div className="flex flex-col items-center gap-6 text-center">
              <SectionLabel>New tab extension · Chrome & Firefox</SectionLabel>
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-tight">
                DxHome
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                A quieter new tab, built for developers.
              </p>
              <p className="max-w-xl text-muted-foreground">
                A clock, a command bar that does more than search, your
                shortcuts, tasks and reading list — over a wallpaper you choose.
                No account. No ads. No paywall. No analytics.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#6E8BFF] text-[#0A0E1A] hover:bg-[#6E8BFF]/90"
                >
                  <a href={STORE} target="_blank" rel="noopener noreferrer">
                    <DownloadSimple size={16} weight="bold" />
                    Add to Chrome
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={REPO} target="_blank" rel="noopener noreferrer">
                    <GithubLogo size={16} weight="bold" />
                    View source
                  </a>
                </Button>
              </div>
            </div>

            {/* The new tab itself */}
            <div
              className="mt-14 overflow-hidden border p-2"
              style={{ backgroundColor: MIDNIGHT, borderColor: "#6E8BFF33" }}
            >
              <Image
                src="/apps/dx-home/dx-home-newtab.png"
                alt="The DxHome new tab: a large clock over a blue and violet wallpaper, a command bar, shortcut icons, recently closed tabs, and a tasks panel down the right side"
                width={1280}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Section>

        {/* Feature grid */}
        <Section>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything on one screen
            </h2>
            <p className="max-w-lg text-muted-foreground">
              The things you open a new tab for, without the clutter.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-3 border p-6">
                <div
                  className="flex size-10 items-center justify-center border"
                  style={{
                    backgroundColor: "#6E8BFF1a",
                    borderColor: "#6E8BFF33",
                    color: IRIS,
                  }}
                >
                  <f.icon size={18} weight="bold" />
                </div>
                <h3 className="text-base font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Backgrounds */}
        <Section>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Pick a view
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Ships with presets — or right-click any image on the web and make
              it your background.
            </p>
          </div>
          <ScrollArea className="-mx-6 mt-8">
            <div className="flex gap-4 px-6 pb-4">
              {backgrounds.map((bg) => (
                <figure key={bg.src} className="w-[240px] shrink-0">
                  <Image
                    src={bg.src}
                    alt={`${bg.label} preset background`}
                    width={480}
                    height={300}
                    sizes="240px"
                    className="h-auto w-full border"
                  />
                  <figcaption className="mt-2 text-xs text-muted-foreground">
                    {bg.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Section>

        {/* Built with */}
        <Section>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built with
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-2 border bg-muted/30 px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <s.icon size={16} />
                {s.label}
              </span>
            ))}
          </div>
        </Section>

        {/* Privacy note */}
        <Section>
          <div className="flex flex-col items-start gap-5 border p-8 md:p-12">
            <div
              className="flex size-10 items-center justify-center border"
              style={{
                backgroundColor: "#6E8BFF1a",
                borderColor: "#6E8BFF33",
                color: IRIS,
              }}
            >
              <ShieldCheck size={18} weight="bold" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Your new tab is nobody else&rsquo;s business
            </h2>
            <p className="max-w-xl text-muted-foreground">
              No account, no ads, no analytics, no tracking. Your bookmarks,
              tasks, reading list and settings live in your browser&rsquo;s own
              storage. Dev-server detection only ever touches localhost, and
              only if you turn it on.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[#6E8BFF] text-[#0A0E1A] hover:bg-[#6E8BFF]/90"
              >
                <a href={STORE} target="_blank" rel="noopener noreferrer">
                  <DownloadSimple size={16} weight="bold" />
                  Add to Chrome
                </a>
              </Button>
              <Link
                href="/apps/dx-home/privacy"
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Read the privacy policy
              </Link>
            </div>
          </div>
        </Section>
      </main>

      <DxHomeFooter />
    </>
  )
}
