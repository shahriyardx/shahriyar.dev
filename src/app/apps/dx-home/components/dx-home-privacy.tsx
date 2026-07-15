import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "@phosphor-icons/react/dist/ssr"
import { Section } from "@/components/section"
import { DxHomeFooter, DxHomeHeader, IRIS, REPO } from "./dx-home-chrome"

const EFFECTIVE = "15 July 2026"

const permissions = [
  {
    name: "topSites",
    why: "Reads your browser's own most-visited list to show shortcuts on the new tab. The list is rendered locally and never sent anywhere.",
  },
  {
    name: "tabs",
    why: "Powers Recent tabs — the titles and URLs of tabs you recently closed — and lets the sidepanel save the page you're on to your reading list.",
  },
  {
    name: "storage",
    why: "Saves your settings and preferences in your browser's extension storage.",
  },
  {
    name: "sidePanel",
    why: "Opens the sidepanel used for backgrounds, the reading list and settings.",
  },
  {
    name: "contextMenus",
    why: "Adds the right-click items: capture a task from selected text or a link, save a page to the reading list, set an image as your background.",
  },
  {
    name: "search",
    why: "Sends a query from the command bar to the search engine you have already chosen in your browser. DxHome does not have its own search engine and never sees the results.",
  },
  {
    name: "localhost / 127.0.0.1 (optional)",
    why: "Only requested if you turn on Dev servers, and only granted when you accept the prompt. It lets DxHome make local HTTP requests to loopback ports to see which dev servers are running. Nothing on the public internet is covered by it, and you can revoke it at any time.",
  },
]

export function DxHomePrivacy() {
  return (
    <>
      <DxHomeHeader />

      <main id="top">
        <Section className="pt-28 md:pt-36">
          <Link
            href="/apps/dx-home"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} weight="bold" />
            Back to DxHome
          </Link>

          <div className="mt-8 flex flex-col gap-5">
            <div
              className="flex size-11 items-center justify-center border"
              style={{
                backgroundColor: "#6E8BFF1a",
                borderColor: "#6E8BFF33",
                color: IRIS,
              }}
            >
              <ShieldCheck size={20} weight="bold" />
            </div>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Effective {EFFECTIVE}
            </p>
          </div>

          <div
            className="mt-10 border p-6 md:p-8"
            style={{ backgroundColor: "#6E8BFF0d", borderColor: "#6E8BFF26" }}
          >
            <h2 className="text-lg font-bold tracking-tight">In short</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              DxHome has no account, no server and no analytics. Your bookmarks,
              tasks, reading list, backgrounds and settings are stored in your
              own browser. Nothing you do on the new tab is collected, profiled
              or sold. The few network requests DxHome makes are listed below,
              in plain terms.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            <Policy title="Who this applies to">
              <p>
                This policy covers the DxHome browser extension for Chrome and
                Firefox, published at{" "}
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  github.com/shahriyardx/dx-home
                </a>
                . DxHome replaces your new tab page with a dashboard: a clock,
                command bar, bookmarks, dev servers, recent tabs, reading list
                and tasks.
              </p>
            </Policy>

            <Policy title="Data we collect">
              <p>
                None. DxHome has no accounts, no backend and no database. It
                does not collect personal information, browsing history, search
                queries, usage analytics or location. There are no trackers, no
                telemetry and no crash reporting. The developer cannot see
                anything you do in the extension.
              </p>
            </Policy>

            <Policy title="Where your data lives">
              <p>
                Bookmarks, tasks, reading-list items and recent-tab history are
                stored in a local IndexedDB database in your browser. Settings
                and preferences use your browser&rsquo;s extension storage. A
                background image you choose is stored locally too. All of it
                stays on your device and is removed when you uninstall the
                extension or clear its data.
              </p>
            </Policy>

            <Policy title="Network requests DxHome makes">
              <p>
                DxHome has no server of its own, so it never &ldquo;phones
                home&rdquo;. It does make these requests, all triggered by
                something you did:
              </p>
              <ul className="ml-5 flex list-disc flex-col gap-2 marker:text-muted-foreground/40">
                <li>
                  <span className="text-foreground">Search and shortcuts.</span>{" "}
                  Pressing Enter in the command bar hands your query to the
                  search engine already configured in your browser, or navigates
                  to the site you typed. That request goes to them, under their
                  privacy policy — exactly as it would from the address bar.
                </li>
                <li>
                  <span className="text-foreground">Favicons.</span> To show a
                  site&rsquo;s icon next to a bookmark, tab or reading-list
                  item, DxHome first tries that site&rsquo;s own{" "}
                  <code className="text-foreground">/favicon.ico</code>. If that
                  fails, it falls back to DuckDuckGo&rsquo;s icon service, which
                  means the domain name (never the full URL, and sent without a
                  referrer) is visible to DuckDuckGo. No other detail is
                  included.
                </li>
                <li>
                  <span className="text-foreground">Dev servers.</span> If you
                  enable the feature, DxHome makes HTTP requests to loopback
                  ports on your own machine to see what&rsquo;s running. These
                  never leave your computer.
                </li>
              </ul>
            </Policy>

            <Policy title="Permissions, and why each one exists">
              <ul className="flex flex-col gap-4">
                {permissions.map((p) => (
                  <li key={p.name} className="border p-5">
                    <p className="font-mono text-sm font-semibold tracking-tight">
                      {p.name}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.why}
                    </p>
                  </li>
                ))}
              </ul>
            </Policy>

            <Policy title="Dev servers, in detail">
              <p>
                The dev-server list works by making a short HTTP request to a
                fixed set of common development ports on{" "}
                <code className="text-foreground">localhost</code> and{" "}
                <code className="text-foreground">127.0.0.1</code>. Only servers
                that answer with an HTTP response can appear, so databases such
                as Postgres, MySQL, MongoDB and Redis never show up — they speak
                their own protocols and the request simply fails.
              </p>
              <p>
                The permission is optional and requested in context, so people
                who never run a dev server are never asked for it. Results are
                shown on your new tab and stored nowhere else.
              </p>
            </Policy>

            <Policy title="Sharing of information">
              <p>
                There is nothing to share. DxHome does not sell, rent, transfer
                or disclose user data, because it never collects any in the
                first place.
              </p>
            </Policy>

            <Policy title="Children's privacy">
              <p>
                DxHome is safe for users of all ages. Since it collects no
                personal data, it does not knowingly gather information from
                children and is consistent with COPPA and similar rules.
              </p>
            </Policy>

            <Policy title="Your control over your data">
              <ul className="ml-5 flex list-disc flex-col gap-2 marker:text-muted-foreground/40">
                <li>
                  Delete any bookmark, task or reading-list item from inside the
                  extension.
                </li>
                <li>
                  Revoke the optional localhost permission in your
                  browser&rsquo;s extension settings whenever you like.
                </li>
                <li>
                  Uninstalling DxHome removes its local database and stored
                  settings.
                </li>
              </ul>
            </Policy>

            <Policy title="Changes to this policy">
              <p>
                This page may be updated as the extension changes or as laws
                require. Updates are posted here with a new effective date, and
                the full history is public in the repository.
              </p>
            </Policy>

            <Policy title="Contact">
              <p>
                Questions or concerns? Open an issue at{" "}
                <a
                  href={`${REPO}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  github.com/shahriyardx/dx-home/issues
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:contact@shahriyar.dev"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  contact@shahriyar.dev
                </a>
                .
              </p>
            </Policy>
          </div>
        </Section>
      </main>

      <DxHomeFooter />
    </>
  )
}

function Policy({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      <div className="flex max-w-2xl flex-col gap-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}
