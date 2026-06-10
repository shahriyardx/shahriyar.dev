import type { Metadata } from "next"
import { About } from "@/components/about"

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer passionate about building performant, accessible web experiences with React, Next.js, and TypeScript.",
}

export default function AboutPage() {
  return <About />
}
