import type { Metadata } from "next"
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Shahriyar. Have a project in mind or just want to chat? Drop a message.",
}

export default function ContactPage() {
  return <Contact />
}
