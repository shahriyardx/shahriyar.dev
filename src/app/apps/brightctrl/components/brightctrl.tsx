import Image from "next/image"

const REPO = "https://github.com/shahriyardx/brightctrl"
const RELEASE = "https://github.com/shahriyardx/brightctrl/releases/latest"
const NPM = "https://www.npmjs.com/package/brightctrl"
const VERSION = "0.2.3"

// brightctrl brand — read straight off its own TUI.
const SHELL = "#15171F" // outside the window
const PANE = "#1C1F29" // the terminal pane
const EDGE = "#2C3140"
const MINT = "#7EE7C7"
const DIM = "#8B92A5"
const TEXT = "#E6E9EF"

/** A shell prompt line. The glyph is decoration — screen readers skip it. */
function Prompt({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 font-mono text-sm">
      <span aria-hidden="true" style={{ color: MINT }}>
        ❯
      </span>
      <span style={{ color: TEXT }}>{children}</span>
    </p>
  )
}

/** A TUI-style bordered box with its label notched into the top edge. */
function Box({
  label,
  children,
  className = "",
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative rounded-sm border p-5 pt-6 ${className}`}
      style={{ borderColor: EDGE, backgroundColor: PANE }}
    >
      <span
        className="absolute -top-2 left-4 px-2 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ backgroundColor: PANE, color: MINT }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

const why = [
  "One native binary — no ddcutil, no Node.js, no runtime deps.",
  "DDC/CI straight over i2c on Linux; Monitor Configuration API on Windows.",
  "A TUI when you want one, a CLI when you're scripting.",
  "Name a monitor once, then target it by alias instead of an id.",
  "Sync every monitor at once, or drop to 1% steps.",
  "Config is plain TOML at ~/.config/brightctrl/config.toml.",
]

const commands = [
  { cmd: "brightctrl", desc: "open the interactive TUI" },
  { cmd: "brightctrl list", desc: "monitors with ids, aliases, brightness" },
  { cmd: "brightctrl get <target>", desc: "print brightness (0-100)" },
  { cmd: "brightctrl set <target> <0-100>", desc: "set brightness" },
  { cmd: "brightctrl alias <id> <name>", desc: "name a monitor" },
  { cmd: "brightctrl alias <id>", desc: "remove the alias" },
]

const keys = [
  { key: "↑ ↓ / k j", action: "Pick a monitor" },
  { key: "← → / h l", action: "Brightness down / up" },
  { key: "1 – 9", action: "Select monitor by number" },
  { key: "/", action: "Type an exact value (0-100)" },
  { key: "p", action: "Precise mode — 1% steps" },
  { key: "s", action: "Sync — all monitors at once" },
  { key: "m", action: "Set brightness to 0" },
  { key: "r", action: "Refresh monitor list" },
  { key: "?", action: "Help" },
  { key: "q", action: "Quit" },
]

const installs = [
  { label: "npm / npx", note: "Linux & Windows, x64", cmd: "npx brightctrl" },
  { label: "Arch (AUR)", note: "", cmd: "yay -S brightctrl" },
  { label: "Scoop", note: "Windows", cmd: "scoop install brightctrl" },
  {
    label: "WinGet",
    note: "Windows",
    cmd: "winget install shahriyardx.brightctrl",
  },
  {
    label: "Cargo",
    note: "from source",
    cmd: "cargo install --git https://github.com/shahriyardx/brightctrl",
  },
]

const LINUX_SETUP = `sudo modprobe i2c-dev
echo i2c-dev | sudo tee /etc/modules-load.d/i2c.conf
sudo usermod -aG i2c $USER   # then log out and back in`

const CONFIG = `# ~/.config/brightctrl/config.toml
[aliases]
GSM7707 = "left"
27M2N5500 = "main"
LG-HDR-4K = "up"`

export function Brightctrl() {
  return (
    <div
      className="min-h-screen font-mono"
      style={{ backgroundColor: SHELL, color: TEXT }}
    >
      {/* Terminal title bar */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ borderColor: EDGE, backgroundColor: `${SHELL}e6` }}
      >
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#FF5F57]" />
            <span className="size-3 rounded-full bg-[#FEBC2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
          </div>

          <span className="ml-2 hidden text-xs sm:block" style={{ color: DIM }}>
            brightctrl — v{VERSION}
          </span>

          <nav className="ml-auto flex items-center gap-1 text-xs">
            <a
              href={NPM}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-white/5"
              style={{ color: DIM }}
            >
              npm
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-2.5 py-1.5 transition-colors hover:bg-white/5"
              style={{ color: DIM }}
            >
              source
            </a>
            <a
              href={RELEASE}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded px-3 py-1.5 font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: MINT, color: PANE }}
            >
              install
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-24">
        {/* The session opens */}
        <section className="pt-12 md:pt-16">
          <Prompt>brightctrl --version</Prompt>
          <p className="mt-1 pl-5 font-mono text-sm" style={{ color: DIM }}>
            brightctrl {VERSION}
          </p>

          <div className="mt-10 flex items-center gap-3">
            <Image
              src="/apps/brightctrl/icon.png"
              alt="brightctrl logo"
              width={44}
              height={44}
              className="size-11 rounded-md"
            />
            <h1 className="text-[clamp(2rem,7vw,3.5rem)] font-black leading-none tracking-tight">
              brightctrl
              <span
                className="ml-1 inline-block h-[0.85em] w-[0.5em] translate-y-[0.06em] animate-pulse"
                style={{ backgroundColor: MINT }}
                aria-hidden="true"
              />
            </h1>
          </div>

          <p className="mt-5 text-lg md:text-xl" style={{ color: MINT }}>
            Monitor brightness, straight from your terminal.
          </p>
          <p
            className="mt-3 max-w-2xl text-sm leading-relaxed"
            style={{ color: DIM }}
          >
            Adjust the brightness of your external monitors without leaving the
            keyboard. A single native binary — no{" "}
            <span style={{ color: TEXT }}>ddcutil</span>, no Node.js, no runtime
            dependencies. Linux talks DDC/CI directly over i2c; Windows uses the
            Monitor Configuration API.
          </p>

          <div className="mt-8">
            <Prompt>npx brightctrl</Prompt>
            <p className="mt-1 pl-5 text-xs" style={{ color: DIM }}>
              # or grab a binary from the{" "}
              <a
                href={RELEASE}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-opacity hover:opacity-80"
                style={{ color: MINT }}
              >
                latest release
              </a>
            </p>
          </div>

          {/* The TUI, in its own pane */}
          <div
            className="mt-10 overflow-hidden rounded-sm border"
            style={{ borderColor: EDGE, backgroundColor: PANE }}
          >
            <div
              className="flex items-center justify-between border-b px-3 py-1.5 text-[10px]"
              style={{ borderColor: EDGE, color: DIM }}
            >
              <span>brightctrl</span>
              <span aria-hidden="true">1 / 3 monitors</span>
            </div>
            <Image
              src="/apps/brightctrl/brightctrl-tui.png"
              alt="The brightctrl terminal interface listing three external monitors with their i2c devices, aliases, and brightness bars set to 50 percent"
              width={1237}
              height={540}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="h-auto w-full"
            />
          </div>
        </section>

        {/* Why */}
        <section className="pt-16">
          <Prompt>brightctrl --help</Prompt>
          <div className="mt-4 pl-5">
            <h2
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: DIM }}
            >
              Description
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {why.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm">
                  <span aria-hidden="true" style={{ color: MINT }}>
                    ✓
                  </span>
                  <span style={{ color: DIM }}>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Commands */}
        <section className="pt-14">
          <div className="pl-5">
            <h2
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: DIM }}
            >
              Commands
            </h2>
            <dl className="mt-3 flex flex-col gap-2.5">
              {commands.map((c) => (
                <div
                  key={c.cmd}
                  className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <dt
                    className="shrink-0 text-sm sm:w-72"
                    style={{ color: TEXT }}
                  >
                    {c.cmd}
                  </dt>
                  <dd className="text-sm" style={{ color: DIM }}>
                    {c.desc}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs" style={{ color: DIM }}>
              # &lt;target&gt; is a monitor number (
              <span style={{ color: TEXT }}>1</span>), an id (
              <span style={{ color: TEXT }}>GSM7707</span>), or an alias (
              <span style={{ color: TEXT }}>left</span>).
            </p>
          </div>
        </section>

        {/* Keys — the TUI's own help panel */}
        <section className="pt-14">
          <Prompt>
            <span style={{ color: DIM }}># press </span>?
            <span style={{ color: DIM }}> in the TUI</span>
          </Prompt>
          <Box label="Keys" className="mt-4">
            <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {keys.map((k) => (
                <div
                  key={k.key}
                  className="flex items-baseline justify-between gap-4 border-b border-dashed pb-1.5"
                  style={{ borderColor: `${EDGE}` }}
                >
                  <dt className="text-sm" style={{ color: MINT }}>
                    {k.key}
                  </dt>
                  <dd className="text-right text-xs" style={{ color: DIM }}>
                    {k.action}
                  </dd>
                </div>
              ))}
            </dl>
          </Box>
        </section>

        {/* Install */}
        <section className="pt-14">
          <div className="pl-5">
            <h2
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: DIM }}
            >
              Install
            </h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {installs.map((i) => (
              <div
                key={i.label}
                className="flex flex-col gap-1.5 rounded-sm border px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                style={{ borderColor: EDGE, backgroundColor: PANE }}
              >
                <div className="flex shrink-0 items-baseline gap-2 sm:w-40">
                  <span className="text-xs" style={{ color: TEXT }}>
                    {i.label}
                  </span>
                  {i.note && (
                    <span className="text-[10px]" style={{ color: DIM }}>
                      {i.note}
                    </span>
                  )}
                </div>
                <code className="overflow-x-auto text-xs whitespace-nowrap">
                  <span aria-hidden="true" style={{ color: MINT }}>
                    ${" "}
                  </span>
                  {i.cmd}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Setup */}
        <section className="pt-14">
          <div className="grid gap-5 lg:grid-cols-2">
            <Box label="Linux setup">
              <p className="text-xs leading-relaxed" style={{ color: DIM }}>
                # DDC/CI needs the i2c module and group access — once.
              </p>
              <pre
                className="mt-3 overflow-x-auto text-xs leading-relaxed"
                style={{ color: TEXT }}
              >
                <code>{LINUX_SETUP}</code>
              </pre>
              <p
                className="mt-3 text-xs leading-relaxed"
                style={{ color: DIM }}
              >
                # On Windows: nothing to do — just enable DDC/CI in your
                monitor&rsquo;s OSD if <span style={{ color: TEXT }}>list</span>{" "}
                comes up empty.
              </p>
            </Box>

            <Box label="Config">
              <pre
                className="overflow-x-auto text-xs leading-relaxed"
                style={{ color: TEXT }}
              >
                <code>{CONFIG}</code>
              </pre>
              <p
                className="mt-3 text-xs leading-relaxed"
                style={{ color: DIM }}
              >
                # Aliases live here. Set them with{" "}
                <span style={{ color: TEXT }}>brightctrl alias</span> — or edit
                the file.
              </p>
            </Box>
          </div>
        </section>

        {/* Built with */}
        <section className="pt-14">
          <Prompt>
            <span style={{ color: DIM }}>cat </span>Cargo.toml
          </Prompt>
          <div className="mt-3 pl-5">
            <p className="text-sm" style={{ color: DIM }}>
              Rust · ratatui · clap · ddc · serde · toml — Linux i2c and the
              Windows Monitor Configuration API, from one source tree. MIT.
            </p>
          </div>
        </section>
      </main>

      {/* tmux-ish status bar */}
      <footer
        className="sticky bottom-0 border-t"
        style={{ borderColor: EDGE, backgroundColor: PANE }}
      >
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-0 text-[11px]">
          <span
            className="px-3 py-1.5 font-semibold"
            style={{ backgroundColor: MINT, color: PANE }}
          >
            brightctrl
          </span>
          <span style={{ color: DIM }}>MIT</span>
          <span className="hidden sm:inline" style={{ color: DIM }}>
            ~/.config/brightctrl/config.toml
          </span>
          <span className="ml-auto flex items-center gap-3 pr-3">
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
              style={{ color: DIM }}
            >
              source
            </a>
            <a
              href={RELEASE}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: MINT }}
            >
              v{VERSION}
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
