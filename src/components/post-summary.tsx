"use client"

import { useState } from "react"
import { FileText, Lightbulb } from "@phosphor-icons/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
  tldr: string | null
  keyTakeaways: string | null
}

function parseTakeaways(raw: string): string[] {
  try {
    const items = JSON.parse(raw)
    if (Array.isArray(items)) return items
  } catch {}
  return [raw]
}

export function PostSummary({ tldr, keyTakeaways }: Props) {
  const [openTldr, setOpenTldr] = useState(false)
  const [openTakeaways, setOpenTakeaways] = useState(false)

  if (!tldr && !keyTakeaways) return null

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {tldr && (
        <Dialog open={openTldr} onOpenChange={setOpenTldr}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FileText size={14} className="mr-1" />
              TLDR
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>TLDR</DialogTitle>
            </DialogHeader>
            <p className="text-sm leading-relaxed text-muted-foreground">{tldr}</p>
          </DialogContent>
        </Dialog>
      )}
      {keyTakeaways && (
        <Dialog open={openTakeaways} onOpenChange={setOpenTakeaways}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Lightbulb size={14} className="mr-1" />
              Key Takeaways
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Key Takeaways</DialogTitle>
            </DialogHeader>
            <ul className="flex flex-col gap-2">
              {parseTakeaways(keyTakeaways).map((item, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted-foreground">• {item}</li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
