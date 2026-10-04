import type { Metadata } from "next"
import { Serve } from "./components/serve"

export const metadata: Metadata = {
  title: "Serve — Deploy on your own servers",
  description:
    "A self-hosted platform for apps, databases and services. Push to deploy, get a domain with HTTPS, and manage every server from one dashboard. Apache 2.0.",
  icons: {
    icon: "/apps/serve/favicon.png",
    apple: "/apps/serve/icon.png",
  },
  openGraph: {
    title: "Serve — Deploy on your own servers",
    description:
      "Push to deploy apps, databases and one-click services on servers you own. Domains, HTTPS, backups and teams from one dashboard.",
    type: "website",
  },
}

export default function ServePage() {
  return <Serve />
}
