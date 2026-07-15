import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Section } from "@/components/section"
import { Cmd, PageHeader, PROMPT } from "@/components/terminal"
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
          <PageHeader cmd="ls ~/apps" title="Apps">
            Things I&apos;ve built and shipped. Each one runs on your own device
            — no accounts, no tracking.
          </PageHeader>

          <p className="mt-10 text-xs text-muted-foreground/60">
            total {apps.length}
          </p>

          <ul className="mt-4 flex flex-col gap-4">
            {apps.map((app) => (
              <li key={app.slug}>
                <article
                  className="group border bg-card transition-colors"
                  style={{ borderColor: `${app.accent}26` }}
                >
                  {/* Path bar, tinted with the app's own accent */}
                  <div
                    className="flex items-center justify-between gap-3 border-b px-4 py-2"
                    style={{
                      borderColor: `${app.accent}26`,
                      backgroundColor: `${app.accent}0d`,
                    }}
                  >
                    <span className="truncate text-xs text-muted-foreground">
                      ~/apps/{app.slug}
                    </span>
                    <span className="flex shrink-0 gap-2">
                      {app.platforms.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] tracking-widest uppercase"
                          style={{ color: app.accent }}
                        >
                          {p}
                        </span>
                      ))}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 p-5 md:flex-row md:gap-6 md:p-6">
                    <Image
                      src={app.icon}
                      alt=""
                      width={52}
                      height={52}
                      className="size-13 shrink-0 rounded-xl"
                    />

                    <div className="flex min-w-0 flex-1 flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <p className="text-xs text-muted-foreground">
                          <span style={{ color: PROMPT }} aria-hidden="true">
                            ❯{" "}
                          </span>
                          cat README.md
                        </p>
                        <h2 className="text-lg font-bold tracking-tight">
                          <span
                            className="text-muted-foreground/40"
                            aria-hidden="true"
                          >
                            #{" "}
                          </span>
                          {app.name}
                        </h2>
                        <p
                          className="text-sm font-medium"
                          style={{ color: app.accent }}
                        >
                          {app.tagline}
                        </p>
                      </div>

                      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {app.description}
                      </p>

                      <div className="mt-1 flex items-center justify-between gap-4 border-t pt-4">
                        <p className="min-w-0 truncate text-xs text-muted-foreground">
                          <span style={{ color: PROMPT }} aria-hidden="true">
                            ❯{" "}
                          </span>
                          open /apps/{app.slug}
                        </p>

                        <div className="flex shrink-0 items-center gap-4">
                          <a
                            href={app.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <GithubLogo size={13} />
                            Source
                          </a>
                          <Link
                            href={`/apps/${app.slug}`}
                            className="inline-flex items-center gap-1 border px-3 py-1.5 text-xs transition-colors hover:bg-muted/40"
                            style={{ borderColor: `${app.accent}40` }}
                          >
                            Visit page
                            <span
                              className="transition-transform group-hover:translate-x-0.5"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <Cmd className="mt-8">
            <span className="text-muted-foreground/60">
              {apps.length} director{apps.length === 1 ? "y" : "ies"} listed
            </span>
          </Cmd>
        </Section>
      </main>
      <Footer />
    </>
  )
}
