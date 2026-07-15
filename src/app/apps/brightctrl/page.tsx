import type { Metadata } from "next"
import { Brightctrl } from "./components/brightctrl"

export const metadata: Metadata = {
  title: "brightctrl — Monitor brightness from your terminal",
  description:
    "A single native binary that adjusts the brightness of your external monitors over DDC/CI. TUI and CLI, Linux and Windows, no ddcutil and no runtime dependencies.",
  icons: {
    icon: "/apps/brightctrl/favicon.png",
    apple: "/apps/brightctrl/icon.png",
  },
  openGraph: {
    title: "brightctrl — Monitor brightness from your terminal",
    description:
      "Adjust external monitor brightness over DDC/CI from a TUI or CLI. One native Rust binary, Linux and Windows, no runtime dependencies.",
    type: "website",
  },
}

export default function BrightctrlPage() {
  return <Brightctrl />
}
