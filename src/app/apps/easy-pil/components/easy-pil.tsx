import Image from "next/image"
import { codeToHtml } from "shiki"
import { CodeToImage, type Example } from "./code-to-image"

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

// The three in the hero tabs are deliberately not repeated here.
const gallery = [
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

const api = [
  {
    group: "Text",
    blurb: "Wraps, fits and shadows itself. Mix fonts and colours in one line.",
    methods: [
      "text",
      "rich_text",
      "text_box",
      "text_shadow",
      "fit_text",
      "centered_text",
    ],
  },
  {
    group: "Shapes",
    blurb: "Fills, outlines, stroke widths — gradients work as fills too.",
    methods: [
      "rectangle",
      "ellipse",
      "squircle",
      "bar",
      "rounded_bar",
      "polygon",
      "star",
      "arc",
      "line",
      "donut",
    ],
  },
  {
    group: "Adjust",
    blurb: "The usual transforms, without touching Pillow directly.",
    methods: [
      "resize",
      "rotate",
      "crop",
      "flip",
      "thumbnail",
      "contrast",
      "brightness",
      "saturation",
      "invert",
      "blur",
    ],
  },
  {
    group: "Composite",
    blurb: "Stack images, mask them, round them off.",
    methods: [
      "paste",
      "blend",
      "mask",
      "compose",
      "rounded_corners",
      "circle_image",
      "add_border",
    ],
  },
  {
    group: "Colour",
    blurb: "Gradients and canvases you can hand straight to any fill.",
    methods: [
      "Canvas",
      "LinearGradient",
      "RadialGradient",
      "Font.poppins",
      "Text",
    ],
  },
  {
    group: "I/O · async · GIF",
    blurb:
      "Load remote images without blocking, write bytes, edit every frame of a GIF.",
    methods: [
      "Editor.open",
      "save",
      "show",
      "to_bytes",
      "load_image_async",
      "GifEditor",
    ],
  },
]

/**
 * Excerpts lifted from examples/*.py, trimmed with `…` where whole blocks are
 * cut. Every line here is really in the script that renders the image beside it.
 */
const EXAMPLES = [
  {
    file: "profile_card.py",
    src: "/apps/easy-pil/profile_card.png",
    w: 1000,
    h: 340,
    lines: 95,
    alt: "The profile card easy-pil renders: circular avatar in a gradient donut ring, name, a Level 47 pill, rank/games/win-rate stats and an XP bar",
    code: `W, H = 1000, 340
ACCENT = LinearGradient(["#7f5af0", "#2cb1ff"])

card = Editor(Canvas((W, H), color="#0e0e14"))
card.effect(ColorOverlay((10, 10, 18), alpha=0.38))

# Avatar: gradient donut ring with a circular avatar seated inside it.
AV_CX, AV_CY = 140, 170
card.donut((AV_CX, AV_CY), 96, 105, fill=ACCENT)
avatar = Editor(Canvas((184, 184), color=RadialGradient(["#f6d365", "#fda085"])))
avatar.circle_image()
card.paste(avatar, (AV_CX - 92, AV_CY - 92))

card.text((285, 66), "Nova Sterling",
          font=Font.poppins(variant="bold", size=46), color="#ffffff")

# Level pill.
card.rectangle((285, 178), 138, 40, fill=ACCENT, radius=20)
…
# Slim XP bar with a knob.
card.rounded_bar((285, 268), BAR_W, 10, percentage=74, fill=ACCENT)
card.ellipse((knob_x - 9, 264), 18, 18, fill="#ffffff")

card.save(OUT / "profile_card.png")`,
  },
  {
    file: "music_card.py",
    src: "/apps/easy-pil/music_card.png",
    w: 1000,
    h: 420,
    lines: 98,
    alt: "The music card easy-pil renders: album art with a drop shadow, a NOW PLAYING label, track title and a playback progress bar",
    code: `W, H = 1000, 420
ALBUM = LinearGradient(["#f5567b", "#ffb457"], direction="diagonal")

# Ambient backdrop: an enlarged, blurred wash of the album colours.
ambient = Editor(Canvas((W, H), color=ALBUM)).blur("gaussian", 70)
card = Editor(Canvas((W, H), color="#0d0d12"))
card.paste(ambient, (0, 0), opacity=0.5)
card.effect(ColorOverlay((8, 8, 12), alpha=0.52))

# Album cover: a squircle inset in a padded canvas so its shadow has room.
art = Editor(Canvas((380, 380), color=(0, 0, 0, 0)))
art.squircle((40, 40), 300, 300, radius_ratio=0.36, fill=ALBUM)
art.effect(DropShadow(offset=(0, 18), blur_radius=34, alpha=0.55))
card.paste(art, (20, 20))

card.text((410, 70), "N O W   P L A Y I N G",
          font=Font.poppins(variant="bold", size=17), color="#ffb457")
…
card.save(OUT / "music_card.png")`,
  },
  {
    file: "welcome_banner.py",
    src: "/apps/easy-pil/welcome_banner.png",
    w: 1000,
    h: 400,
    lines: 74,
    alt: "The welcome banner easy-pil renders: a circular avatar in a gradient ring, star confetti and greeting text",
    code: `W, H = 1000, 400
ACCENT = LinearGradient(["#38f9d7", "#43e97b"])

# Ambient glow blooming from the top-centre.
ambient = Editor(
    Canvas((W, H), color=RadialGradient(["#0f9b8e", "#0b0e14"], center=(0.5, 0.0)))
).blur("gaussian", 80)
card = Editor(Canvas((W, H), color="#0b0e14"))
card.paste(ambient, (0, 0), opacity=0.6)

# Star confetti scattered across the top.
confetti = [(120, 60, 10), (250, 110, 6), (820, 70, 11), (910, 140, 7)]
for cx, cy, r in confetti:
    card.star((cx, cy), 5, r, r * 0.45, fill=(120, 230, 200, 120))

# Avatar: gradient ring with circular avatar seated inside.
card.donut((W // 2, 140), 78, 86, fill=ACCENT)
…
card.save(OUT / "welcome_banner.png")`,
  },
] as const

export async function EasyPil() {
  const examples = await Promise.all(
    EXAMPLES.map(
      async (e): Promise<Example> => ({
        ...e,
        html: await codeToHtml(e.code, {
          lang: "python",
          theme: "vitesse-dark",
        }),
      }),
    ),
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
        {/* Hero — the pitch, then the pitch proved */}
        <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-24">
          <div className="flex flex-col items-start gap-6">
            <span className="text-[11px] font-medium tracking-[0.2em] text-white/40 uppercase">
              Python image library
            </span>
            <h1 className="text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.95] font-black tracking-tight">
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
            <p className="text-lg text-white/70 md:text-2xl">
              Write a few lines of Python. Get an image back.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-white/50">
              Cards, banners, dashboards and tickets — composed in code, with
              real fonts, gradients, shapes and shadows. No design tool, no
              headless browser, no boilerplate. Built on Pillow.
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-3 rounded-lg border px-4 py-2.5 font-mono text-sm"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <span className="text-white/30">$</span>
                <code>pip install easy-pil</code>
              </div>
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
          </div>

          {/* The claim, demonstrated: real script, real output, side by side */}
          <div className="mt-12">
            <CodeToImage examples={examples} />
          </div>

          <p className="mt-4 text-xs text-white/35">
            Python ≥ 3.11 · MIT · every image on this page is output from a
            script in{" "}
            <a
              href={`${REPO}/tree/master/examples`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-white/60"
            >
              examples/
            </a>
          </p>
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

        {/* The API, at a glance */}
        <section className="mx-auto max-w-6xl px-5 pt-24">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            The whole API
          </h2>
          <p className="mt-2 max-w-lg text-sm text-white/50">
            One <code className="text-white/80">Editor</code>. Every method
            returns it, so they chain — and they read like what you&rsquo;re
            trying to draw.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {api.map((group) => (
              <div
                key={group.group}
                className="rounded-lg border p-4"
                style={{ borderColor: EDGE, backgroundColor: PANEL }}
              >
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[11px] font-semibold tracking-[0.15em] text-white/40 uppercase">
                    {group.group}
                  </h3>
                  <span className="text-[10px] text-white/25">
                    {group.methods.length}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                  {group.blurb}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.methods.map((m) => (
                    <li
                      key={m}
                      className="rounded border px-2 py-1 font-mono text-[11px] text-white/75"
                      style={{
                        borderColor: EDGE,
                        backgroundColor: "#ffffff08",
                      }}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
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

        <div className="pb-24" />
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
