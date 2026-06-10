"use client"

import { Button } from "@/components/ui/button"
import { Download } from "@phosphor-icons/react"

export function ResumeDownload() {
  return (
    <Button asChild className="gap-2">
      <a href="/shahriyardx.pdf" download="shahriyar-resume.pdf">
        <Download size={14} />
        Download PDF
      </a>
    </Button>
  )
}
