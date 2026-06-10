"use client"

import { useEffect, useState } from "react"
import type { TOCItem } from "@/lib/toc"
import { cn } from "@/lib/utils"

interface TOCProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <nav>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </h2>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} style={{ paddingLeft: `${(item.level - 1) * 12}px` }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
                activeId === item.id && "font-medium text-foreground",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
