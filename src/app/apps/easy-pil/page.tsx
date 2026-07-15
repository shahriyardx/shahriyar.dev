import type { Metadata } from "next"
import { EasyPil } from "./components/easy-pil"

export const metadata: Metadata = {
  title: "easy-pil — Pillow, without the boilerplate",
  description:
    "A Python library built on Pillow for building cards, banners and dashboards in a few lines: 38 chainable effects, self-wrapping text, shapes, compositing, async loading and GIF editing.",
  icons: {
    icon: "/apps/easy-pil/favicon.png",
    apple: "/apps/easy-pil/icon.png",
  },
  openGraph: {
    title: "easy-pil — Pillow, without the boilerplate",
    description:
      "38 chainable image effects behind one method, plus text, shapes, compositing and GIF editing. A Python library built on Pillow.",
    type: "website",
  },
}

export default function EasyPilPage() {
  return <EasyPil />
}
