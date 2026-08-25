import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Section } from "@/components/section"
import { PageHeader } from "@/components/page-header"
import { apps } from "./apps"

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Apps I've built and released — a local-only finance app for Android, a new tab extension for Chrome and Firefox, a terminal monitor-brightness controller, and two Python libraries.",
}

export default function AppsPage() {
  return (
    <>
      <Header />
      <main>
        <Section className="pt-28 md:pt-36">
          <PageHeader eyebrow="Apps" title="Apps">
            Things I&apos;ve built and shipped. Each one runs on your own device
            — no accounts, no tracking.
          </PageHeader>

          <ul className="mt-10 flex flex-col gap-4">
            {apps.map((app) => (
              <li key={app.slug}>
                <article className="group border transition-colors hover:border-foreground/25">
                  <div className="flex flex-col gap-4 p-5 md:flex-row md:gap-6 md:p-6">
                    <Image
                      src={app.icon}
                      alt=""
                      width={52}
                      height={52}
                      className="size-13 shrink-0 rounded-lg"
                    />

                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h2 className="font-sans text-lg font-semibold tracking-tight">
                            {app.name}
                          </h2>
                          <span className="flex gap-2">
                            {app.platforms.map((p) => (
                              <span
                                key={p}
                                className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase"
                              >
                                {p}
                              </span>
                            ))}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {app.tagline}
                        </p>
                      </div>

                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {app.description}
                      </p>

                      <div className="mt-1 flex items-center gap-5 border-t pt-4">
                        <Link
                          href={`/apps/${app.slug}`}
                          className="text-xs transition-colors hover:text-muted-foreground"
                        >
                          Visit page →
                        </Link>
                        <a
                          href={app.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <GithubLogo size={13} />
                          Source
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  )
}
