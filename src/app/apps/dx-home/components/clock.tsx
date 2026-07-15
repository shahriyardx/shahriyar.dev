"use client"

import { useEffect, useState } from "react"

/**
 * The real clock from the extension. Server-rendering a time would ship a stale
 * one and mismatch on hydration, so it stays blank until mounted.
 */
export function Clock() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now
    ? now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "--:-- --"

  const date = now
    ? now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : " "

  return (
    <div className="flex flex-col gap-1">
      <p
        className="text-[clamp(3rem,10vw,6.5rem)] leading-none font-black tracking-tight tabular-nums text-white"
        suppressHydrationWarning
      >
        {time}
      </p>
      <p className="text-sm text-white/60" suppressHydrationWarning>
        {date}
      </p>
    </div>
  )
}
