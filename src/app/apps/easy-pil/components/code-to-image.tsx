"use client"

import Image from "next/image"
import { useState } from "react"

export interface Example {
  file: string
  /** Shiki-highlighted markup, produced on the server. */
  html: string
  src: string
  w: number
  h: number
  alt: string
  lines: number
}

const EDGE = "#2E2E52"
const PANEL = "#1B1B36"

/** The transparency checkerboard an image editor mounts artwork on. */
const CHECKER: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(45deg, #ffffff0a 25%, transparent 25%), linear-gradient(-45deg, #ffffff0a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ffffff0a 75%), linear-gradient(-45deg, transparent 75%, #ffffff0a 75%)",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
}

/**
 * The pitch, made literal: a real example script beside the image it actually
 * renders. Switching tabs swaps both halves.
 */
export function CodeToImage({ examples }: { examples: Example[] }) {
  const [active, setActive] = useState(0)
  const current = examples[active]

  return (
    <div className="flex flex-col">
      {/* Tabs sit directly on the panel below — the -mb-px laps their bottom
          edge over its top border so they read as one surface. */}
      <div
        className="-mb-px flex gap-1 overflow-x-auto"
        role="tablist"
        aria-label="Examples"
      >
        {examples.map((ex, i) => {
          const selected = i === active
          return (
            <button
              key={ex.file}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className="shrink-0 rounded-t-md border-x border-t px-3 py-2 font-mono text-[11px] transition-colors"
              style={{
                borderColor: selected ? EDGE : "transparent",
                backgroundColor: selected ? PANEL : "transparent",
                color: selected ? "#E7E7F5" : "#8B8BA7",
              }}
            >
              {ex.file}
            </button>
          )
        })}
      </div>

      <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_1.05fr]">
        {/* The code — square top-left so the active tab meets it cleanly */}
        <div
          className="flex min-w-0 flex-col overflow-hidden rounded-lg rounded-tl-none border"
          style={{ borderColor: EDGE, backgroundColor: PANEL }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-2"
            style={{ borderColor: EDGE }}
          >
            <span className="font-mono text-[11px] text-white/45">
              {current.file}
            </span>
            <span className="text-[10px] text-white/30">
              excerpt · {current.lines} lines total
            </span>
          </div>
          <div
            className="flex-1 overflow-x-auto [&>pre]:!bg-transparent [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-[11.5px] [&>pre]:leading-relaxed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output for build-time constants
            dangerouslySetInnerHTML={{ __html: current.html }}
          />
        </div>

        {/* What it renders */}
        <figure
          className="flex flex-col overflow-hidden rounded-lg border"
          style={{ borderColor: EDGE, backgroundColor: PANEL }}
        >
          <div
            className="flex items-center gap-2 border-b px-4 py-2"
            style={{ borderColor: EDGE }}
          >
            <span
              aria-hidden="true"
              className="font-mono text-[11px] text-white/30"
            >
              →
            </span>
            <span className="font-mono text-[11px] text-white/45">
              {current.file.replace(".py", ".png")}
            </span>
            <span className="ml-auto font-mono text-[10px] text-white/25">
              {current.w}×{current.h}
            </span>
          </div>
          <div
            className="flex flex-1 items-center justify-center p-3"
            style={CHECKER}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.w}
              height={current.h}
              priority={active === 0}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full rounded"
            />
          </div>
        </figure>
      </div>
    </div>
  )
}
