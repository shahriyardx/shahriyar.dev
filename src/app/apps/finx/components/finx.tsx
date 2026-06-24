import Image from "next/image"
import {
  ArrowsLeftRight,
  ChatCircleText,
  DownloadSimple,
  Fingerprint,
  FloppyDisk,
  GithubLogo,
  HandCoins,
  Receipt,
  ShieldCheck,
  TrendUp,
  Wallet,
} from "@phosphor-icons/react/dist/ssr"
import {
  SiAndroid,
  SiDrizzle,
  SiExpo,
  SiReact,
  SiSqlite,
  SiTypescript,
} from "react-icons/si"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Section, SectionLabel } from "@/components/section"
import {
  FinxFooter,
  FinxHeader,
  FOREST,
  LIME,
  RELEASE,
  REPO,
} from "./finx-chrome"

const screenshots = [
  {
    src: "/apps/finx/finx-1.jpg",
    alt: "FinX home dashboard with a swipable total-balance card showing this month's income and spending above a recent transactions list",
  },
  {
    src: "/apps/finx/finx-2.jpg",
    alt: "FinX wallets screen listing City Bank, SC Bank, Cash and bKash, each with its own color and live balance",
  },
  {
    src: "/apps/finx/finx-3.jpg",
    alt: "FinX activity screen for June 2026 with monthly income and expense totals and transactions grouped by wallet",
  },
  {
    src: "/apps/finx/finx-4.jpg",
    alt: "FinX people screen tracking who owes you, showing a contact with an outstanding lent balance",
  },
  {
    src: "/apps/finx/finx-5.jpg",
    alt: "FinX person detail with the amount owed, a Lend / Borrow action, and a list of open debts",
  },
  {
    src: "/apps/finx/finx-6.jpg",
    alt: "FinX settings with currency selection, biometric unlock, automatic bank-SMS import, and data export and import",
  },
]

const features = [
  {
    icon: Wallet,
    title: "Wallets",
    body: "One per money source — cash, bank, mobile wallet — each with a live balance.",
  },
  {
    icon: TrendUp,
    title: "Income & expenses",
    body: "Log money in and out; wallet balances update automatically.",
  },
  {
    icon: ArrowsLeftRight,
    title: "Transfers",
    body: "Move money wallet-to-wallet without counting it as income or spending.",
  },
  {
    icon: HandCoins,
    title: "Lend & borrow",
    body: "Track who owes what, tied to people, with repayments.",
  },
  {
    icon: Receipt,
    title: "Receipt photos",
    body: "Attach a photo to any transaction and open it in a full-screen viewer.",
  },
  {
    icon: ChatCircleText,
    title: "Bank SMS import",
    body: "Reads City Bank, Standard Chartered & bKash texts; bKash actions auto-labelled.",
  },
  {
    icon: Fingerprint,
    title: "PIN & biometrics",
    body: "PIN lock with optional fingerprint/face unlock; biometric recovery never wipes data.",
  },
  {
    icon: FloppyDisk,
    title: "Backup & restore",
    body: "Full JSON backup and restore — your data, in your hands.",
  },
  {
    icon: ShieldCheck,
    title: "On-device only",
    body: "SMS is read on-device just to fill transactions. Nothing ever leaves the phone.",
  },
]

const stack = [
  { icon: SiExpo, label: "Expo SDK 56" },
  { icon: SiReact, label: "React Native 0.85" },
  { icon: SiReact, label: "React 19" },
  { icon: SiExpo, label: "expo-router" },
  { icon: SiDrizzle, label: "Drizzle ORM" },
  { icon: SiSqlite, label: "expo-sqlite" },
  { icon: Fingerprint, label: "expo-local-authentication" },
  { icon: ShieldCheck, label: "expo-secure-store" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiAndroid, label: "Android-first" },
]

export function Finx() {
  return (
    <>
      <FinxHeader />

      <main id="top">
        {/* Hero */}
        <Section className="pt-28 pb-0 md:pt-36">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-6">
              <SectionLabel>Personal finance · Android</SectionLabel>
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.9] tracking-tight">
                FinX
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Private, local-only money tracking.
              </p>
              <p className="max-w-md text-muted-foreground">
                Everything stays on your device — no account, no backend, no
                cloud, no tracking. Track wallets, income and expenses,
                transfers, and lending, with optional automatic bank-SMS import.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#9FE870] text-[#163300] hover:bg-[#9FE870]/90"
                >
                  <a href={RELEASE} target="_blank" rel="noopener noreferrer">
                    <DownloadSimple size={16} weight="bold" />
                    Download APK
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

            {/* Hero screenshot — the live home dashboard in a phone frame */}
            <div className="relative flex justify-center md:justify-end">
              <div
                className="absolute inset-0 -z-10 blur-3xl"
                style={{
                  background:
                    "radial-gradient(60% 55% at 70% 35%, #9FE87026, transparent 70%)",
                }}
              />
              <div
                className="w-[250px] shrink-0 overflow-hidden rounded-[2.4rem] border p-2 sm:w-[280px]"
                style={{ backgroundColor: FOREST, borderColor: "#9FE87033" }}
              >
                <Image
                  src={screenshots[0].src}
                  alt={screenshots[0].alt}
                  width={1440}
                  height={3120}
                  priority
                  sizes="280px"
                  className="h-auto w-full rounded-[1.8rem]"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Screenshot showcase */}
        <Section>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              A look inside
            </h2>
            <p className="max-w-lg text-muted-foreground">
              From the swipable dashboard to receipt-backed transactions and
              automatic SMS import.
            </p>
          </div>
          <ScrollArea className="-mx-6 mt-8">
            <div className="flex gap-5 px-6 pb-4">
              {screenshots.map((shot) => (
                <figure
                  key={shot.src}
                  className="w-[230px] shrink-0 overflow-hidden rounded-[2rem] border bg-muted/30 p-2"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1440}
                    height={3120}
                    sizes="230px"
                    className="h-auto w-full rounded-[1.4rem]"
                  />
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Section>

        {/* Feature grid */}
        <Section>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to stay on top
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Built for everyday money tracking, fully offline.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col gap-3 border p-6">
                <div
                  className="flex size-10 items-center justify-center border"
                  style={{
                    backgroundColor: "#9FE8701a",
                    borderColor: "#9FE87033",
                    color: LIME,
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

        {/* Privacy / install footer note */}
        <Section>
          <div className="flex flex-col items-start gap-5 border p-8 md:p-12">
            <div
              className="flex size-10 items-center justify-center border"
              style={{
                backgroundColor: "#9FE8701a",
                borderColor: "#9FE87033",
                color: LIME,
              }}
            >
              <ShieldCheck size={18} weight="bold" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Your money data never leaves your phone
            </h2>
            <p className="max-w-xl text-muted-foreground">
              No account, no backend, no cloud, no tracking. SMS is read only
              on-device to fill in transactions. FinX is Android-only — install
              it from the APK and allow installs from unknown sources.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-[#9FE870] text-[#163300] hover:bg-[#9FE870]/90"
              >
                <a href={RELEASE} target="_blank" rel="noopener noreferrer">
                  <DownloadSimple size={16} weight="bold" />
                  Download APK
                </a>
              </Button>
              <Link
                href="/apps/finx/privacy"
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Read the privacy policy
              </Link>
            </div>
          </div>
        </Section>
      </main>

      <FinxFooter />
    </>
  )
}
