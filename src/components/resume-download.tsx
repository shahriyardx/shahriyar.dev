"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "@phosphor-icons/react"
import { toast } from "sonner"

export function ResumeDownload() {
  const [loading, setLoading] = useState(false)

  const download = async () => {
    setLoading(true)
    try {
      const html2canvas = (await import("html2canvas")).default
      const { jsPDF } = await import("jspdf")

      const el = document.getElementById("resume-content")
      if (!el) {
        toast.error("Could not find resume content")
        return
      }

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#09090b",
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 10
      const imgWidth = pageWidth - margin * 2
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const usableHeight = pageHeight - margin * 2

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight)

      let page = 2
      while ((page - 1) * usableHeight < imgHeight) {
        pdf.addPage()
        pdf.addImage(imgData, "PNG", margin, margin - (page - 1) * usableHeight, imgWidth, imgHeight)
        page++
      }

      pdf.save("shahriyar-resume.pdf")
      toast.success("PDF downloaded")
    } catch (err) {
      console.error("PDF generation failed:", err)
      toast.error("Failed to generate PDF. Check console.")
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
