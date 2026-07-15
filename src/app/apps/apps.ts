export interface AppEntry {
  slug: string
  name: string
  tagline: string
  description: string
  icon: string
  /** Brand accent, used to tint the card. */
  accent: string
  platforms: string[]
  repo: string
  /** True when /apps/<slug>/privacy exists — keeps the sitemap honest. */
  privacy?: boolean
}

export const apps: AppEntry[] = [
  {
    slug: "finx",
    name: "FinX",
    tagline: "Private, local-only money tracking",
    description:
      "A personal finance app for Android. Wallets, income and expenses, transfers and lending — with optional bank-SMS import. No account, no cloud, no tracking.",
    icon: "/apps/finx/icon.png",
    accent: "#9FE870",
    platforms: ["Android"],
    repo: "https://github.com/shahriyardx/finx",
    privacy: true,
  },
  {
    slug: "dx-home",
    name: "DxHome",
    tagline: "A quieter new tab, built for developers",
    description:
      "A new tab extension with a clock, a command bar that calculates and jumps to dev servers, bookmarks, tasks and a reading list — over a wallpaper you choose.",
    icon: "/apps/dx-home/icon.png",
    accent: "#6E8BFF",
    platforms: ["Chrome", "Firefox"],
    repo: "https://github.com/shahriyardx/dx-home",
    privacy: true,
  },
  {
    slug: "brightctrl",
    name: "brightctrl",
    tagline: "Monitor brightness from your terminal",
    description:
      "A single native binary that adjusts external monitor brightness over DDC/CI. TUI and CLI, no ddcutil and no runtime dependencies.",
    icon: "/apps/brightctrl/icon.png",
    accent: "#7EE7C7",
    platforms: ["Linux", "Windows"],
    repo: "https://github.com/shahriyardx/brightctrl",
  },
  {
    slug: "betterspread",
    name: "betterspread",
    tagline: "Every cell and row, first-class and async",
    description:
      "An async Python wrapper around gspread. Read, write, clear, style and delete individual cells and rows without ever leaving async/await.",
    icon: "/apps/betterspread/icon.png",
    accent: "#0F9D58",
    platforms: ["Python"],
    repo: "https://github.com/shahriyardx/betterspread",
  },
  {
    slug: "easy-pil",
    name: "easy-pil",
    tagline: "Pillow, without the boilerplate",
    description:
      "A Python image library for building cards, banners and dashboards in a few lines — 38 chainable effects, self-wrapping text, shapes, compositing and GIF editing.",
    icon: "/apps/easy-pil/icon.png",
    accent: "#8B5CF6",
    platforms: ["Python"],
    repo: "https://github.com/shahriyardx/easy-pil",
  },
]
