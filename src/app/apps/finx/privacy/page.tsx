import type { Metadata } from "next"
import { FinxPrivacy } from "../components/finx-privacy"

export const metadata: Metadata = {
  title: "FinX — Privacy Policy",
  description:
    "FinX is a local-only Android finance app. No account, no backend, no cloud, no analytics — your data never leaves your device.",
  icons: {
    icon: "/apps/finx/favicon.png",
    apple: "/apps/finx/icon.png",
  },
}

export default function FinxPrivacyPage() {
  return <FinxPrivacy />
}
