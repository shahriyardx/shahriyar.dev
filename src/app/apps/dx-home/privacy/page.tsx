import type { Metadata } from "next"
import { DxHomePrivacy } from "../components/dx-home-privacy"

export const metadata: Metadata = {
  title: "DxHome — Privacy Policy",
  description:
    "DxHome collects nothing. No account, no server, no analytics — your bookmarks, tasks and reading list stay in your own browser.",
  icons: {
    icon: "/apps/dx-home/favicon.png",
    apple: "/apps/dx-home/icon.png",
  },
}

export default function DxHomePrivacyPage() {
  return <DxHomePrivacy />
}
