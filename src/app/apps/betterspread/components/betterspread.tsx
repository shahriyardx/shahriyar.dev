import Image from "next/image"
import { codeToHtml } from "shiki"

const REPO = "https://github.com/shahriyardx/betterspread"
const PYPI = "https://pypi.org/project/betterspread/"
const DOCS = "https://betterspread.readthedocs.io"
const VERSION = "1.1.0"

// Google Sheets' own palette — this page is meant to read as a spreadsheet.
const GREEN = "#0F9D58"
const GREEN_DARK = "#0B8043"
const GRID = "#E1E3E1"
const INK = "#202124"
const MUTED = "#5F6368"

const columns = ["A", "B", "C"]

// Every row here is a ✗ for gspread and a ✓ for betterspread.
const comparison = [
  "Async-native API",
  "Cell as a first-class object",
  "Row as a first-class object",
  "Per-cell update / clear / style / delete",
  "Per-row update / clear / style / delete",
  "Lazy connection (opens on first use)",
  "Credentials from a file or a dict",
  "Automatic retry/backoff on rate limits",
  "Numeric cell accessor (cell.number)",
]

const objects = [
  {
    id: "connection",
    name: "Connection",
    summary: "Authenticates with Google and holds the gspread client.",
    signature: "Connection(credentials_path=..., credentials_dict=...)",
    methods: ["credentials_path", "credentials_dict"],
  },
  {
    id: "sheet",
    name: "Sheet",
    summary:
      "A spreadsheet. Opens lazily — no network call until the first await.",
    signature: "Sheet(sheet_name, connection, folder_id=None)",
    methods: ["await open()", "await get_tab(name)", "await tabs()"],
  },
  {
    id: "tab",
    name: "Tab",
    summary: "A worksheet. Reads return Rows and Cells, not raw lists.",
    signature: "tab = await sheet.get_tab('Sheet1')",
    methods: [
      "await values()",
      "await get_row(n)",
      "await get_cell('B2')",
      "await append([...])",
      "await del_row(start, end)",
      "await del_cell(...)",
    ],
  },
  {
    id: "row",
    name: "Row",
    summary: "A list subclass — index it like a list, await methods on it.",
    signature: "row = await tab.get_row(1)",
    methods: [
      "await update([...])",
      "await clear()",
      "await style(obj)",
      "await refetch()",
      "await append_cell(v)",
      "await delete()",
    ],
  },
  {
    id: "cell",
    name: "Cell",
    summary: "A str subclass — use it as a string, or read cell.number.",
    signature: "cell = await tab.get_cell('B2')",
    methods: [
      "cell.number",
      "cell.label",
      "await update(v)",
      "await clear()",
      "await style(obj)",
      "await delete(shift='left')",
    ],
  },
  {
    id: "style",
    name: "Style",
    summary: "Formatting, without touching gspread_formatting directly.",
    signature: "Style(bg_color='#fff', bold=True, ...)",
    methods: [
      "bg_color",
      "text_color",
      "horizontal_align",
      "vertical_align",
      "bold",
      "italic",
      "strikethrough",
    ],
  },
]

const setup = [
  "Open the Google Cloud Console, create or select a project.",
  "Enable the Google Sheets API and the Google Drive API.",
  "APIs & Services → Credentials → Create Credentials → Service Account.",
  "Open the service account → Keys → download a JSON key as credentials.json.",
  "Share your Sheet with the service account's client_email as an Editor.",
]

const QUICKSTART = `import asyncio
from betterspread import Connection, Sheet

async def main():
    con = Connection(credentials_path="./credentials.json")
    sheet = Sheet(connection=con, sheet_name="My Spreadsheet")

    tab = await sheet.get_tab("Sheet1")

    # --- read ---
    rows = await tab.values()          # list[Row]
    row  = await tab.get_row(1)        # Row (1-based)
    cell = await tab.get_cell("B2")    # Cell

    print(cell)                        # Cell is a plain str subclass
    print(row[0].label, row[0])        # "A"  "hello"

    # --- write ---
    cell = await cell.update("world")
    await row.update(["Alice", "30", "Engineer"])

    # --- append ---
    await tab.append(["Bob", "25", "Designer"])

    # --- clear / delete ---
    await cell.clear()
    await row.delete()

asyncio.run(main())`

/** The grey gutter cell carrying a row number, as in a real sheet. */
function RowNum({ n }: { n: number }) {
  return (
    <td
      className="w-10 select-none border px-2 py-2 text-center align-top text-[11px] tabular-nums"
      style={{ borderColor: GRID, backgroundColor: "#F8F9FA", color: MUTED }}
    >
      {n}
    </td>
  )
}

export async function Betterspread() {
  const quickstartHtml = await codeToHtml(QUICKSTART, {
    lang: "python",
    theme: "github-dark",
  })

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: "#F8F9FA", color: INK, colorScheme: "light" }}
    >
      {/* Toolbar — the app bar of a spreadsheet */}
      <header
        className="sticky top-0 z-50 border-b bg-white"
        style={{ borderColor: GRID }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <Image
            src="/apps/betterspread/icon.png"
            alt="betterspread logo"
            width={28}
            height={28}
            className="size-7"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">betterspread</span>
            <span className="text-[11px]" style={{ color: MUTED }}>
              v{VERSION} · PyPI
            </span>
          </div>

          <nav className="ml-auto flex items-center gap-1 text-sm">
            <a
              href={DOCS}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-3 py-1.5 transition-colors hover:bg-black/5"
              style={{ color: MUTED }}
            >
              Docs
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded px-3 py-1.5 transition-colors hover:bg-black/5"
              style={{ color: MUTED }}
            >
              GitHub
            </a>
            <a
              href={PYPI}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              Install
            </a>
          </nav>
        </div>

        {/* Formula bar */}
        <div
          className="flex items-center gap-3 border-t bg-white px-4 py-1.5"
          style={{ borderColor: GRID }}
        >
          <span
            className="w-10 shrink-0 border-r pr-2 text-center text-[11px]"
            style={{ borderColor: GRID, color: MUTED }}
          >
            A1
          </span>
          <span
            className="shrink-0 font-serif text-sm italic"
            style={{ color: MUTED }}
          >
            fx
          </span>
          <code className="truncate font-mono text-xs" style={{ color: INK }}>
            =AWAIT(gspread)
          </code>
        </div>
      </header>

      <main>
        {/* Hero, laid out as merged cells */}
        <section className="mx-auto max-w-6xl px-4 pt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th
                  className="w-10 border"
                  style={{ borderColor: GRID, backgroundColor: "#F1F3F4" }}
                >
                  <span className="sr-only">Row</span>
                </th>
                {columns.map((c) => (
                  <th
                    key={c}
                    className="border px-2 py-1 text-center text-[11px] font-normal"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#F1F3F4",
                      color: MUTED,
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <RowNum n={1} />
                <td
                  colSpan={3}
                  className="border bg-white px-4 py-6 md:px-8 md:py-10"
                  style={{ borderColor: GRID }}
                >
                  <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    betterspread
                  </h1>
                </td>
              </tr>
              <tr>
                <RowNum n={2} />
                <td
                  colSpan={3}
                  className="border bg-white px-4 py-4 md:px-8"
                  style={{ borderColor: GRID }}
                >
                  <p
                    className="text-lg font-medium md:text-2xl"
                    style={{ color: GREEN_DARK }}
                  >
                    Every cell and row, first-class and async.
                  </p>
                </td>
              </tr>
              <tr>
                <RowNum n={3} />
                <td
                  colSpan={3}
                  className="border bg-white px-4 py-4 md:px-8"
                  style={{ borderColor: GRID }}
                >
                  <p
                    className="max-w-2xl text-sm leading-relaxed md:text-base"
                    style={{ color: MUTED }}
                  >
                    An async Python wrapper around{" "}
                    <a
                      href="https://github.com/burnash/gspread"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                      style={{ color: GREEN_DARK }}
                    >
                      gspread
                    </a>{" "}
                    that gives every cell and row real async methods — read,
                    write, clear, style and delete without ever leaving your{" "}
                    <code
                      className="font-mono text-[0.9em]"
                      style={{ color: INK }}
                    >
                      async
                    </code>
                    /
                    <code
                      className="font-mono text-[0.9em]"
                      style={{ color: INK }}
                    >
                      await
                    </code>{" "}
                    flow.
                  </p>
                </td>
              </tr>
              <tr>
                <RowNum n={4} />
                <td
                  colSpan={3}
                  className="border bg-white px-4 py-5 md:px-8"
                  style={{ borderColor: GRID }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <code
                      className="border px-4 py-2.5 font-mono text-sm"
                      style={{
                        borderColor: GRID,
                        backgroundColor: "#F8F9FA",
                        color: INK,
                      }}
                    >
                      <span style={{ color: MUTED }}>$ </span>pip install
                      betterspread
                    </code>
                    <a
                      href={DOCS}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: GREEN }}
                    >
                      Read the docs
                    </a>
                    <a
                      href={REPO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
                      style={{ borderColor: GRID, color: INK }}
                    >
                      View source
                    </a>
                  </div>
                  <p className="mt-3 text-xs" style={{ color: MUTED }}>
                    Python ≥ 3.10 · or{" "}
                    <code className="font-mono">uv add betterspread</code>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Comparison — an actual spreadsheet */}
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="text-2xl font-bold tracking-tight">
            Why betterspread?
          </h2>
          <p className="mt-2 text-sm" style={{ color: MUTED }}>
            gspread is a great library — but it&rsquo;s synchronous, and it
            works at the spreadsheet level.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse bg-white">
              <thead>
                <tr>
                  <th
                    className="w-10 border"
                    style={{ borderColor: GRID, backgroundColor: "#F1F3F4" }}
                  >
                    <span className="sr-only">Row</span>
                  </th>
                  <th
                    className="border px-4 py-2 text-left text-xs font-medium"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#F1F3F4",
                      color: MUTED,
                    }}
                  >
                    A · Feature
                  </th>
                  <th
                    className="w-28 border px-4 py-2 text-center text-xs font-medium"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#F1F3F4",
                      color: MUTED,
                    }}
                  >
                    B · gspread
                  </th>
                  <th
                    className="w-36 border px-4 py-2 text-center text-xs font-medium"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#E6F4EA",
                      color: GREEN_DARK,
                    }}
                  >
                    C · betterspread
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((feature, i) => (
                  <tr key={feature}>
                    <RowNum n={i + 1} />
                    <td
                      className="border px-4 py-2 text-sm"
                      style={{ borderColor: GRID }}
                    >
                      {feature}
                    </td>
                    <td
                      className="border px-4 py-2 text-center text-sm"
                      style={{ borderColor: GRID, color: "#C5221F" }}
                    >
                      ✗<span className="sr-only">Not supported</span>
                    </td>
                    <td
                      className="border px-4 py-2 text-center text-sm font-medium"
                      style={{
                        borderColor: GRID,
                        backgroundColor: "#F6FBF8",
                        color: GREEN_DARK,
                      }}
                    >
                      ✓<span className="sr-only">Supported</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick start */}
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="text-2xl font-bold tracking-tight">Quick start</h2>
          <p className="mt-2 text-sm" style={{ color: MUTED }}>
            Point it at a service-account key, name your sheet, and await.
          </p>
          <div
            className="mt-6 overflow-hidden rounded-lg border"
            style={{ borderColor: "#2A2E33", backgroundColor: "#1E2124" }}
          >
            <div
              className="flex items-center gap-2 border-b px-4 py-2"
              style={{ borderColor: "#2A2E33" }}
            >
              <span className="font-mono text-[11px] text-[#9AA0A6]">
                main.py
              </span>
            </div>
            <div
              className="overflow-x-auto [&>pre]:!bg-transparent [&>pre]:p-5 [&>pre]:font-mono [&>pre]:text-[13px] [&>pre]:leading-relaxed"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output for a build-time constant
              dangerouslySetInnerHTML={{ __html: quickstartHtml }}
            />
          </div>
        </section>

        {/* API objects */}
        <section id="api" className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="text-2xl font-bold tracking-tight">The objects</h2>
          <p className="mt-2 text-sm" style={{ color: MUTED }}>
            Six of them. That&rsquo;s the whole library.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse bg-white">
              <thead>
                <tr>
                  <th
                    className="w-10 border"
                    style={{ borderColor: GRID, backgroundColor: "#F1F3F4" }}
                  >
                    <span className="sr-only">Row</span>
                  </th>
                  <th
                    className="w-44 border px-4 py-2 text-left text-xs font-medium"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#F1F3F4",
                      color: MUTED,
                    }}
                  >
                    A · Object
                  </th>
                  <th
                    className="border px-4 py-2 text-left text-xs font-medium"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#F1F3F4",
                      color: MUTED,
                    }}
                  >
                    B · What it is
                  </th>
                  <th
                    className="w-72 border px-4 py-2 text-left text-xs font-medium"
                    style={{
                      borderColor: GRID,
                      backgroundColor: "#F1F3F4",
                      color: MUTED,
                    }}
                  >
                    C · Methods
                  </th>
                </tr>
              </thead>
              <tbody>
                {objects.map((o, i) => (
                  <tr key={o.id} id={o.id} className="scroll-mt-28">
                    <RowNum n={i + 1} />
                    <td
                      className="border px-4 py-3 align-top"
                      style={{ borderColor: GRID }}
                    >
                      <span className="font-mono text-sm font-semibold">
                        {o.name}
                      </span>
                    </td>
                    <td
                      className="border px-4 py-3 align-top"
                      style={{ borderColor: GRID }}
                    >
                      <p className="text-sm leading-relaxed">{o.summary}</p>
                      <code
                        className="mt-2 block overflow-x-auto font-mono text-[11px] whitespace-nowrap"
                        style={{ color: MUTED }}
                      >
                        {o.signature}
                      </code>
                    </td>
                    <td
                      className="border px-4 py-3 align-top"
                      style={{ borderColor: GRID, backgroundColor: "#F6FBF8" }}
                    >
                      <ul className="flex flex-col gap-1">
                        {o.methods.map((m) => (
                          <li
                            key={m}
                            className="font-mono text-[11px] leading-relaxed"
                            style={{ color: GREEN_DARK }}
                          >
                            {m}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Google setup */}
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-20">
          <h2 className="text-2xl font-bold tracking-tight">
            Google API setup
          </h2>
          <p className="mt-2 text-sm" style={{ color: MUTED }}>
            One-time, and you need a service account.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse bg-white">
              <tbody>
                {setup.map((step, i) => (
                  <tr key={step}>
                    <RowNum n={i + 1} />
                    <td
                      className="border px-4 py-3 text-sm"
                      style={{ borderColor: GRID }}
                    >
                      {step}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="mt-4 border-l-4 bg-white p-4"
            style={{ borderColor: "#F9AB00" }}
          >
            <p className="text-sm" style={{ color: INK }}>
              <span className="font-medium">Keep the key out of git.</span>{" "}
              <code className="font-mono text-[13px]">credentials.json</code> is
              in <code className="font-mono text-[13px]">.gitignore</code> by
              default — never commit it. Loading from an env var works too:{" "}
              <code className="font-mono text-[13px]">
                Connection(credentials_dict=json.loads(os.environ[&quot;GOOGLE_CREDENTIALS&quot;]))
              </code>
            </p>
          </div>

          <p className="mt-6 text-sm" style={{ color: MUTED }}>
            betterspread runs gspread&rsquo;s blocking calls in a thread pool
            and retries transient <code className="font-mono">429</code>/
            <code className="font-mono">5xx</code> errors with exponential
            backoff. Size the pool with{" "}
            <code className="font-mono">BETTERSPREAD_MAX_WORKERS</code>.
          </p>
        </section>
      </main>

      {/* Sheet tab bar, pinned to the bottom like the real thing */}
      <footer
        className="sticky bottom-0 border-t bg-white"
        style={{ borderColor: GRID }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-1.5">
          <span className="shrink-0 pr-2 text-[11px]" style={{ color: MUTED }}>
            Sheets:
          </span>
          {objects.map((o) => (
            <a
              key={o.id}
              href={`#${o.id}`}
              className="shrink-0 rounded-t border-x border-t px-3 py-1.5 font-mono text-[11px] transition-colors hover:bg-black/5"
              style={{ borderColor: GRID, color: MUTED }}
            >
              {o.name}
            </a>
          ))}
          <span
            className="ml-auto hidden shrink-0 pl-4 text-[11px] sm:block"
            style={{ color: MUTED }}
          >
            MIT · by Md Shahriyar Alam
          </span>
        </div>
      </footer>
    </div>
  )
}
