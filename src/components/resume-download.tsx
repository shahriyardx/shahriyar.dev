"use client"

import { Button } from "@/components/ui/button"
import { Download } from "@phosphor-icons/react"

export function ResumeDownload() {
  const download = () => {
    window.print()
  }

  return (
    <Button onClick={download} className="gap-2">
      <Download size={14} />
      Download PDF
    </Button>
  )
}
