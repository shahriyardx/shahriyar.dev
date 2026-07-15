import type { Metadata } from "next"
import { Betterspread } from "./components/betterspread"

export const metadata: Metadata = {
  title: "betterspread — Async Google Sheets for Python",
  description:
    "An async Python wrapper around gspread that makes every cell and row a first-class object: read, write, clear, style and delete without leaving async/await.",
  icons: {
    icon: "/apps/betterspread/favicon.png",
    apple: "/apps/betterspread/icon.png",
  },
  openGraph: {
    title: "betterspread — Async Google Sheets for Python",
    description:
      "Every cell and row, first-class and async. A Python wrapper around gspread with per-cell and per-row update, clear, style and delete.",
    type: "website",
  },
}

export default function BetterspreadPage() {
  return <Betterspread />
}
