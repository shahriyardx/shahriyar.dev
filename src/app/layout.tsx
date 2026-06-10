import type { Metadata } from "next"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TRPCProvider } from "@/lib/trpc/provider"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Shahriyar — Full-Stack Developer",
    template: "%s — Shahriyar",
  },
  description:
    "Full-stack developer crafting performant, accessible web experiences with modern technologies.",
  metadataBase: new URL("https://shahriyar.dev"),
  openGraph: {
    siteName: "Shahriyar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col">
        <TRPCProvider>
          <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          <Toaster />
        </TRPCProvider>
      </body>
    </html>
  )
}
