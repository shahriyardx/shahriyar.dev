import Image from "next/image"
import { codeToHtml } from "shiki"

const REPO = "https://github.com/shahriyardx/easy-pil"
const PYPI = "https://pypi.org/project/easy-pil/"
const DOCS = "https://easy-pil.readthedocs.io/en/latest/"
const DISCORD = "https://discord.gg/fVzt5THTNb"
const VERSION = "0.7.1"

// easy-pil brand — the violet→cyan gradient its own examples are built with.
const VIOLET = "#8B5CF6"
const CYAN = "#38BDF8"
const CANVAS = "#14142B"
const PANEL = "#1B1B36"
const EDGE = "#2E2E52"

/** The transparency checkerboard every image editor mounts artwork on. */
const CHECKER = {
  backgroundImage:
    "linear-gradient(45deg, #ffffff0a 25%, transparent 25%), linear-gradient(-45deg, #ffffff0a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ffffff0a 75%), linear-gradient(-45deg, transparent 75%, #ffffff0a 75%)",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
}

const effects = [
  {
    category: "Blur & Filters",
    items: [
      "Blur",
      "Contour",
      "Emboss",
      "EdgeEnhance",
      "Sharpen",
      "Smooth",
      "Pixelate",
    ],
  },
  {
    category: "Color",
    items: [
      "Grayscale",
      "Sepia",
      "Invert",
      "Posterize",
      "Solarize",
      "Threshold",
      "Duotone",
    ],
  },
  {
    category: "Overlay",
    items: [
      "ColorOverlay",
      "Gradient",
      "Vignette",
      "Noise",
      "Scanlines",
      "Halftone",
      "Dither",
    ],
  },
  {
    category: "Lighting",
    items: ["Glow", "Bloom", "Neon", "EdgeGlow"],
  },
  {
    category: "Distort",
    items: [
      "Ripple",
      "Vortex",
      "Glitch",
      "PixelSort",
      "Kaleidoscope",
      "ChromaticAberration",
    ],
  },
  {
    category: "Artistic",
    items: ["OilPaint", "TiltShift", "Sketch", "Cartoon", "Thermal"],
  },
  {
    category: "Shadow & Region",
    items: ["DropShadow", "PixelateRegion"],
  },
]

const gallery = [
  {
    src: "/apps/easy-pil/profile_card.png",
    w: 1000,
    h: 340,
    title: "profile_card.py",
    alt: "A profile card rendered with easy-pil: circular avatar with a gradient ring, username, a Level 47 badge, rank/games/win-rate stats and an XP progress bar",
  },
  {
    src: "/apps/easy-pil/music_card.png",
    w: 1000,
    h: 420,
    title: "music_card.py",
    alt: "A music player card rendered with easy-pil, with album art, track title and a playback progress bar",
  },
  {
    src: "/apps/easy-pil/welcome_banner.png",
    w: 1000,
    h: 400,
    title: "welcome_banner.py",
    alt: "A server welcome banner rendered with easy-pil, with an avatar and greeting text",
  },
  {
    src: "/apps/easy-pil/leaderboard.png",
    w: 900,
    h: 500,
    title: "leaderboard.py",
    alt: "A leaderboard image rendered with easy-pil, listing ranked players with scores",
  },
  {
    src: "/apps/easy-pil/stats_dashboard.png",
    w: 1040,
    h: 720,
    title: "stats_dashboard.py",
    alt: "A stats dashboard rendered with easy-pil, with charts and metric tiles",
  },
  {
    src: "/apps/easy-pil/weather_card.png",
    w: 880,
    h: 1020,
    title: "weather_card.py",
    alt: "A weather card rendered with easy-pil, showing the forecast and temperature",
  },
  {
    src: "/apps/easy-pil/crypto_ticker.png",
    w: 1000,
    h: 560,
    title: "crypto_ticker.py",
    alt: "A crypto price ticker rendered with easy-pil, with a trend line and price change",
  },
  {
    src: "/apps/easy-pil/event_ticket.png",
    w: 1100,
    h: 460,
    title: "event_ticket.py",
    alt: "An event ticket rendered with easy-pil, with a perforated edge and event details",
  },
  {
    src: "/apps/easy-pil/quote_card.jpg",
    w: 760,
    h: 950,
    title: "quote_card.py",
    alt: "A quote card rendered with easy-pil, with large centred text over a background image",
  },
]

const capabilities = [
  {
    title: "Text",
    body: "text, rich_text with mixed fonts and colours, auto-wrapping text_box, text_shadow, fit_text, centered_text.",
  },
  {
    title: "Shapes",
    body: "rectangle, ellipse, bar, rounded_bar, polygon, arc, line, donut — fills, outlines and stroke widths.",
  },
  {
    title: "Adjustments",
    body: "resize, rotate, crop, flip, thumbnail, contrast, brightness, saturation, invert, blur.",
  },
  {
    title: "Compositing",
    body: "blend, paste, mask, compose, rounded_corners, circle_image, add_border.",
  },
  {
    title: "Async & I/O",
    body: "load_image_async for remote images, to_bytes for in-memory output, and a context manager that closes for you.",
  },
  {
    title: "GIF",
    body: "GifEditor applies the same edits across every frame and writes the animation back out.",
  },
]

const SNIPPETS = [
  {
    file: "effects.py",
    label: "Chain effects",
    code: `from easy_pil import Editor, load_image
from easy_pil import Vignette, Glow, Blur, Sepia, PixelSort

editor = Editor(load_image("image.jpg"))

# One effect
editor.effect(Vignette(radius=120, feather=60))

# Or chain them
editor.effect(Blur(amount=2)).effect(Sepia()).save("out.png")`,
  },
  {
    file: "text.py",
    label: "Rich text",
    code: `from easy_pil import Editor, Font, Text

editor = Editor("image.jpg")

editor.rich_text((10, 50), [
    Text("Hello", Font.poppins(size=32), "red"),
    Text("World", Font.poppins(size=24), "blue"),
])

editor.text_box((10, 100), "Long text that wraps automatically...",
                font=Font.poppins(size=20), max_width=400)

editor.text_shadow((200, 300), "Hello", font=Font.poppins(size=40),
                   shadow_color="black", shadow_offset=(3, 3))`,
  },
  {
    file: "gif.py",
    label: "GIF & async",
    code: `from easy_pil import GifEditor, load_image_async

# Every frame, same edit
with GifEditor("animation.gif") as gif:
    gif.rotate(90)
    gif.save("rotated.gif")

# Remote images, without blocking
img = await load_image_async("https://example.com/image.png")`,
  },
]

export async function EasyPil() {
  const highlighted = await Promise.all(
    SNIPPETS.map(async (s) => ({
      ...s,
      html: await codeToHtml(s.code, { lang: "python", theme: "vitesse-dark" }),
    })),
  )

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: CANVAS, color: "#E7E7F5" }}
    >
      {/* Editor toolbar */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{ borderColor: EDGE, backgroundColor: `${CANVAS}cc` }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
          <Image
            src="/apps/easy-pil/icon.png"
            alt="easy-pil logo"
            width={28}
            height={28}
            className="size-7 rounded-md"
          />
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight">
              easy-pil
            </span>
            <span className="text-[11px] text-white/40">v{VERSION}</span>
          </div>

          <nav className="ml-auto flex items-center gap-1 text-sm">
            <a
              href={DOCS}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              Docs
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-3 py-1.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              GitHub
            </a>
            <a
              href={PYPI}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-md px-4 py-1.5 text-sm font-semibold text-[#14142B] transition-opacity hover:opacity-90"
              style={{
                backgroundImage: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
              }}
            >
              Install
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — the canvas */}
        <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Python image library
              </span>
              <h1 className="text-[clamp(2.75rem,7vw,4.5rem)] font-black leading-[0.95] tracking-tight">
                easy
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
                  }}
                >
                  -pil
                </span>
              </h1>
              <p className="text-lg text-white/70 md:text-xl">
                Pillow, without the boilerplate.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-white/50">
                Build cards, banners and dashboards in a few lines. 38 effects
                behind one <code className="text-white/80">effect()</code> call,
                text that wraps and fits itself, shapes, compositing, async
                loading and GIFs.
              </p>

              <div
                className="flex items-center gap-3 rounded-lg border px-4 py-3 font-mono text-sm"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <span className="text-white/30">$</span>
                <code>pip install easy-pil</code>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={DOCS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md px-5 py-2.5 text-sm font-semibold text-[#14142B] transition-opacity hover:opacity-90"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
                  }}
                >
                  Read the docs
                </a>
                <a
                  href={REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
                  style={{ borderColor: EDGE }}
                >
                  View source
                </a>
              </div>
              <p className="text-xs text-white/35">
                Python ≥ 3.11 · MIT · built on Pillow
              </p>
            </div>

            {/* Artwork mounted on a transparency grid, as in an editor */}
            <figure
              className="overflow-hidden rounded-xl border p-3"
              style={{ borderColor: EDGE, ...CHECKER, backgroundColor: PANEL }}
            >
              <Image
                src="/apps/easy-pil/effects_showcase.png"
                alt="An effects showcase rendered by easy-pil: the same mountain-and-sun artwork repeated six times, labelled Original, Duotone, Sepia, Bloom, Halftone and Cartoon"
                width={916}
                height={782}
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full rounded-lg"
              />
            </figure>
          </div>
        </section>

        {/* Effects palette */}
        <section className="mx-auto max-w-6xl px-5 pt-24">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            38 effects, one method
          </h2>
          <p className="mt-2 max-w-lg text-sm text-white/50">
            Every effect is a class you pass to{" "}
            <code className="text-white/80">editor.effect(...)</code>. They
            chain, and they all take parameters.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {effects.map((group) => (
              <div
                key={group.category}
                className="rounded-lg border p-4"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
                  {group.category}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((e) => (
                    <li
                      key={e}
                      className="rounded border px-2 py-1 font-mono text-[11px] text-white/75"
                      style={{
                        borderColor: EDGE,
                        backgroundColor: "#ffffff08",
                      }}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Code */}
        <section className="mx-auto max-w-6xl px-5 pt-24">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            A few lines each
          </h2>
          <p className="mt-2 max-w-lg text-sm text-white/50">
            The API reads like what you&rsquo;re trying to draw.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {highlighted.map((s) => (
              <div
                key={s.file}
                className="overflow-hidden rounded-lg border"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <div
                  className="flex items-center justify-between border-b px-4 py-2"
                  style={{ borderColor: EDGE }}
                >
                  <span className="font-mono text-[11px] text-white/45">
                    {s.file}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/30">
                    {s.label}
                  </span>
                </div>
                <div
                  className="overflow-x-auto [&>pre]:!bg-transparent [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-[12px] [&>pre]:leading-relaxed"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output for build-time constants
                  dangerouslySetInnerHTML={{ __html: s.html }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-6xl px-5 pt-24">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Made with easy-pil
          </h2>
          <p className="mt-2 max-w-lg text-sm text-white/50">
            Every image below is output from a script in the{" "}
            <a
              href={`${REPO}/tree/master/examples`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-white"
            >
              examples folder
            </a>{" "}
            — no design tool involved.
          </p>

          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
            {gallery.map((g) => (
              <figure
                key={g.src}
                className="break-inside-avoid overflow-hidden rounded-lg border"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <div className="p-2" style={CHECKER}>
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full rounded"
                  />
                </div>
                <figcaption
                  className="border-t px-3 py-2 font-mono text-[11px] text-white/40"
                  style={{ borderColor: EDGE }}
                >
                  {g.title}
                </figcaption>
              </figure>
            ))}

            <figure
              className="break-inside-avoid overflow-hidden rounded-lg border"
              style={{ borderColor: EDGE, backgroundColor: PANEL }}
            >
              <div className="p-2" style={CHECKER}>
                <Image
                  src="/apps/easy-pil/animated_gif.gif"
                  alt="An animation rendered frame by frame with easy-pil's GifEditor"
                  width={512}
                  height={512}
                  // Optimizing would freeze it on the first frame.
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full rounded"
                />
              </div>
              <figcaption
                className="border-t px-3 py-2 font-mono text-[11px] text-white/40"
                style={{ borderColor: EDGE }}
              >
                animated_gif.py
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Capabilities */}
        <section className="mx-auto max-w-6xl px-5 pt-24 pb-24">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            What&rsquo;s in the box
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border p-5"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${VIOLET}, ${CYAN})`,
                    }}
                  />
                  <h3 className="text-sm font-semibold tracking-tight">
                    {c.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t" style={{ borderColor: EDGE }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm text-white/40">
            easy-pil — a Python library built on Pillow. MIT licensed.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a
              href={DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              Discord
            </a>
            <a
              href={PYPI}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              PyPI
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 transition-colors hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
