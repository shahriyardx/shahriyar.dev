"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "@phosphor-icons/react"

export function ResumeDownload() {
  const [loading, setLoading] = useState(false)

  const download = async () => {
    setLoading(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      const el = document.getElementById("resume-content")
      if (!el) return

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#09090b",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdf.internal.pageSize.getHeight()

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pdf.internal.pageSize.getHeight()
      }

      pdf.save("shahriyar-resume.pdf")
    } catch {
      // ignore
    }
    setLoading(false)
  }

  return (
    <Button onClick={download} disabled={loading} className="gap-2">
      <Download size={14} />
      {loading ? "Generating..." : "Download PDF"}
    </Button>
  )
}
