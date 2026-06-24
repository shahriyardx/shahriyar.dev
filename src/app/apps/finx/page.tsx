import type { Metadata } from "next"
import { Finx } from "./components/finx"

export const metadata: Metadata = {
  title: "FinX — Private, local-only money tracking",
  description:
    "FinX is a local-only personal finance app for Android. Track wallets, income and expenses, transfers, and lending — with optional automatic bank-SMS import. No account, no backend, no cloud, no tracking.",
  icons: {
    icon: "/apps/finx/favicon.png",
    apple: "/apps/finx/icon.png",
  },
  openGraph: {
    title: "FinX — Private, local-only money tracking",
    description:
      "Local-only personal finance for Android. Wallets, income/expense, transfers, lending, and automatic bank-SMS import — everything stays on your device.",
    type: "website",
  },
}

export default function FinxPage() {
  return <Finx />
}
