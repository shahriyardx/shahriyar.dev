import Image from "next/image"
import {
  ArrowUpRight,
  Cloud,
  Database,
  GitBranch,
  GithubLogo,
  Globe,
  HardDrives,
  Package,
  RocketLaunch,
  Scroll,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"

const SITE = "https://serve.bd"
const REPO = "https://github.com/serve-bd/serve"
const RELEASE = "https://github.com/serve-bd/serve/releases/latest"
const VERSION = "0.3.0"
const INSTALL = "curl -fsSL https://serve.bd/install.sh | bash"

// Serve brand — read straight off its own dark theme.
const BG = "#0B0B0D"
const SURFACE = "#161618"
const SURFACE_2 = "#1C1C1E"
const LINE = "rgb(255 255 255 / 0.075)"
const LINE_STRONG = "rgb(255 255 255 / 0.13)"
const FG = "#F5F5F7"
const MUTED = "#98989D"
const FAINT = "#636366"
const BLUE = "#0A84FF"
const GREEN = "#30D158"

/** The Serve mark: a light tile, two server bars, one blue status light. */
function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0"
    >
      <rect x="1" y="1" width="26" height="26" rx="7" fill="#fafafa" />
      <rect
        x="6"
        y="8"
        width="16"
        height="4"
        rx="1.5"
        fill="#0a0a0a"
        opacity="0.9"
      />
      <rect
        x="6"
        y="16"
        width="16"
        height="4"
        rx="1.5"
        fill="#0a0a0a"
        opacity="0.55"
      />
      <circle cx="19" cy="10" r="1.4" fill={BLUE} />
    </svg>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-[11px] uppercase tracking-[0.2em]"
      style={{ color: BLUE }}
    >
      {children}
    </p>
  )
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{ borderColor: LINE, backgroundColor: SURFACE }}
    >
      {children}
    </div>
  )
}

const features = [
  {
    icon: GitBranch,
    title: "Apps from anywhere",
    body: "GitHub, GitLab, Gitea, Bitbucket or any Git URL — or a Docker image, Dockerfile or Compose file. Builds with Nixpacks, Railpack, Buildpacks or auto-detection.",
  },
  {
    icon: Database,
    title: "Databases",
    body: "Postgres, MySQL, MariaDB, MongoDB, Redis, Valkey and ClickHouse. Scheduled backups to disk or S3, one-click restore.",
  },
  {
    icon: Package,
    title: "One-click services",
    body: "n8n, Uptime Kuma, Plausible, Ghost, Nextcloud, Vaultwarden, Grafana, MinIO and more — plus your own templates.",
  },
  {
    icon: RocketLaunch,
    title: "Safe deploys",
    body: "Zero downtime, health checks, rollbacks and pull request previews. Approvals and deploy freezes when you need them.",
  },
  {
    icon: Globe,
    title: "Domains & HTTPS",
    body: "nginx, Caddy or Traefik in front, with Let's Encrypt certificates that renew on their own.",
  },
  {
    icon: Cloud,
    title: "Cloudflare",
    body: "Manage DNS records and run Tunnels, so a server without a public IP can still serve the web.",
  },
  {
    icon: HardDrives,
    title: "Many servers",
    body: "Add machines over SSH — even behind NAT — and join them with an encrypted private network.",
  },
  {
    icon: Scroll,
    title: "Logs, your way",
    body: "Ship logs to an HTTP endpoint, Loki, Elasticsearch, OpenSearch, Splunk or syslog.",
  },
  {
    icon: UsersThree,
    title: "Teams",
    body: "Organizations, roles, project access, passkeys, two-factor auth and a full activity log.",
  },
]

const steps = [
  {
    title: "Install",
    body: "Run one command on a Linux box. It installs Docker if it's missing and asks for three ports.",
  },
  {
    title: "Connect Git",
    body: "Link GitHub in one click, or add any other provider. Give the dashboard a domain for webhooks.",
  },
  {
    title: "Deploy",
    body: "New project → new service. Pick an app, database or template, check the settings, ship it.",
  },
  {
    title: "Grow",
    body: "Add servers over SSH when one isn't enough. Updates back up Serve first and roll back on failure.",
  },
]

const ports = [
  { port: "80, 443", proto: "TCP", use: "Your apps, through the proxy" },
  { port: "8000", proto: "TCP", use: "The dashboard, until it has a domain" },
  { port: "7822", proto: "TCP", use: "Servers without a public IP" },
  { port: "51820", proto: "UDP", use: "Private network between servers" },
]

export function Serve() {
  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ backgroundColor: BG, color: FG }}
    >
      {/* Glass top bar, like the dashboard's own */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{ borderColor: LINE, backgroundColor: `${BG}cc` }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Logo size={26} />
          <span className="text-[15px] font-semibold tracking-tight">
            Serve
          </span>
          <span
            className="hidden font-mono text-[11px] sm:inline"
            style={{ color: FAINT }}
          >
            v{VERSION}
          </span>

          <nav className="ml-auto flex items-center gap-1 text-[13px]">
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/5"
              style={{ color: MUTED }}
            >
              Website
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 sm:inline"
              style={{ color: MUTED }}
            >
              GitHub
            </a>
            <a
              href="#install"
              className="ml-1 rounded-full px-4 py-1.5 font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: BLUE, color: "#fff" }}
            >
              Install
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[480px] max-w-3xl rounded-full opacity-30 blur-[120px]"
            style={{ backgroundColor: BLUE }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl px-4 pt-20 text-center md:pt-28">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
              style={{
                borderColor: LINE_STRONG,
                backgroundColor: SURFACE,
                color: MUTED,
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: GREEN }}
                aria-hidden="true"
              />
              Self-hosted · Open source · Apache 2.0
            </span>

            <h1 className="font-sans mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-tight">
              Deploy on your own servers.
            </h1>
            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ color: MUTED }}
            >
              Apps, databases and services on machines you own. Push to deploy,
              get a domain with HTTPS, and run it all from one dashboard.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#install"
                className="rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: BLUE, color: "#fff" }}
              >
                Get started
              </a>
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ borderColor: LINE_STRONG }}
              >
                <GithubLogo size={16} />
                View source
              </a>
            </div>
          </div>

          {/* The dashboard, in a window */}
          <div className="relative mx-auto mt-16 max-w-6xl px-4">
            <div
              className="overflow-hidden rounded-2xl border shadow-[0_24px_80px_-12px_rgb(0_0_0/0.6)]"
              style={{ borderColor: LINE_STRONG, backgroundColor: SURFACE }}
            >
              <div
                className="flex items-center gap-1.5 border-b px-4 py-3"
                style={{ borderColor: LINE }}
                aria-hidden="true"
              >
                <span className="size-3 rounded-full bg-[#FF5F57]" />
                <span className="size-3 rounded-full bg-[#FEBC2E]" />
                <span className="size-3 rounded-full bg-[#28C840]" />
              </div>
              <Image
                src="/apps/serve/overview.png"
                alt="The Serve overview: running services, recent deploys, project and server health, and a year of deploy activity"
                width={1800}
                height={1513}
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 pt-28">
          <div className="max-w-2xl">
            <Eyebrow>What it does</Eyebrow>
            <h2 className="font-sans mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A whole platform, minus the bill.
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: MUTED }}>
              Everything you'd reach for a hosted PaaS to do — on hardware you
              already pay for.
            </p>
          </div>

          <ul
            className="mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3"
            style={{ borderColor: LINE, backgroundColor: LINE }}
          >
            {features.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex flex-col gap-3 p-6"
                style={{ backgroundColor: SURFACE }}
              >
                <span
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "rgb(10 132 255 / 0.16)",
                    color: BLUE,
                  }}
                >
                  <Icon size={18} weight="duotone" />
                </span>
                <h3 className="font-sans font-medium tracking-tight">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-6xl px-4 pt-28">
          <div className="max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="font-sans mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              From bare server to live app.
            </h2>
          </div>

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full p-6">
                  <span className="font-mono text-xs" style={{ color: FAINT }}>
                    0{i + 1}
                  </span>
                  <h3 className="font-sans mt-4 font-medium tracking-tight">
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {step.body}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* Install */}
        <section
          id="install"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-28"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div className="min-w-0">
              <Eyebrow>Install</Eyebrow>
              <h2 className="font-sans mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                One command.
              </h2>
              <p className="mt-4 leading-relaxed" style={{ color: MUTED }}>
                Any Linux server — Ubuntu, Debian, Fedora, Rocky — with
                2&nbsp;GB of RAM and root access. Then open{" "}
                <span className="font-mono text-sm" style={{ color: FG }}>
                  http://&lt;server-ip&gt;:8000
                </span>{" "}
                and create the owner account.
              </p>
              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: FAINT }}
              >
                Use a server dedicated to Serve: it controls Docker, which is
                equal to root on the host. Images ship for amd64 and arm64.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <div
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: LINE_STRONG, backgroundColor: "#1C1C1E" }}
              >
                <div
                  className="border-b px-4 py-2.5 font-mono text-[11px]"
                  style={{ borderColor: LINE, color: FAINT }}
                >
                  bash
                </div>
                <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed">
                  <code>
                    <span aria-hidden="true" style={{ color: GREEN }}>
                      ${" "}
                    </span>
                    <span style={{ color: "#E5E5EA" }}>{INSTALL}</span>
                  </code>
                </pre>
              </div>

              <Card className="overflow-hidden">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Ports Serve uses</caption>
                  <thead>
                    <tr style={{ color: FAINT }}>
                      <th className="px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.15em]">
                        Port
                      </th>
                      <th className="px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.15em]">
                        Used for
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ports.map((p) => (
                      <tr
                        key={p.port}
                        className="border-t"
                        style={{ borderColor: LINE }}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[13px]">
                          {p.port}{" "}
                          <span style={{ color: FAINT }}>{p.proto}</span>
                        </td>
                        <td className="px-4 py-3" style={{ color: MUTED }}>
                          {p.use}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="mx-auto max-w-6xl px-4 py-28">
          <div
            className="flex flex-col items-center gap-6 rounded-3xl border px-6 py-16 text-center"
            style={{ borderColor: LINE, backgroundColor: SURFACE_2 }}
          >
            <Logo size={48} />
            <h2 className="font-sans max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
              Your servers. Your apps. One dashboard.
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: BLUE, color: "#fff" }}
              >
                serve.bd
                <ArrowUpRight size={14} />
              </a>
              <a
                href={RELEASE}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border px-5 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ borderColor: LINE_STRONG }}
              >
                Release notes
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t" style={{ borderColor: LINE }}>
        <div
          className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-6 text-xs"
          style={{ color: FAINT }}
        >
          <span className="flex items-center gap-2" style={{ color: MUTED }}>
            <Logo size={16} />
            Serve
          </span>
          <span>Apache 2.0</span>
          <span className="font-mono">ghcr.io/serve-bd/serve</span>
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto transition-colors hover:text-white"
          >
            Source
          </a>
          <a
            href={RELEASE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono transition-colors hover:text-white"
            style={{ color: BLUE }}
          >
            v{VERSION}
          </a>
        </div>
      </footer>
    </div>
  )
}
