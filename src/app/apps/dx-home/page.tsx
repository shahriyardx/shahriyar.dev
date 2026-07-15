import type { Metadata } from "next"
import { DxHome } from "./components/dx-home"

export const metadata: Metadata = {
  title: "DxHome — A quieter new tab, built for developers",
  description:
    "DxHome is a minimal new tab extension for Chrome and Firefox: a clock, a command bar that calculates and jumps to dev servers, bookmarks, tasks and a reading list. No account, no ads, no analytics.",
  icons: {
    icon: "/apps/dx-home/favicon.png",
    apple: "/apps/dx-home/icon.png",
  },
  openGraph: {
    title: "DxHome — A quieter new tab, built for developers",
    description:
      "A clock, a command bar that does more than search, your shortcuts, tasks and reading list — over a wallpaper you choose. No account, no ads, no analytics.",
    type: "website",
  },
}

export default function DxHomePage() {
  return <DxHome />
}
