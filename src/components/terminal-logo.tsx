"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PROMPT } from "@/components/terminal"

const TEXT = "shahriyar.dev"
const SPEED = 55
const START_DELAY = 150

/**
 * The wordmark types itself out once per page load — and again on hover, once
 * the first run has finished. The full text is always in the DOM for screen
 * readers; only the visual is animated.
 */
export function TerminalLogo() {
  const [typed, setTyped] = useState("")
  const [done, setDone] = useState(false)
  // Bumping this re-runs the typing effect.
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TEXT)
      setDone(true)
      return
    }

    setTyped("")
    setDone(false)

    let i = 0
    let typer: ReturnType<typeof setInterval>

    const starter = setTimeout(
      () => {
        typer = setInterval(() => {
          i++
          setTyped(TEXT.slice(0, i))
          if (i >= TEXT.length) {
            clearInterval(typer)
            setDone(true)
          }
        }, SPEED)
      },
      run === 0 ? START_DELAY : 0,
    )

    return () => {
      clearTimeout(starter)
      clearInterval(typer)
    }
  }, [run])

  return (
    <Link
      href="/"
      onMouseEnter={() => {
        if (done) setRun((r) => r + 1)
      }}
      className="group text-sm font-medium tracking-tight"
    >
      <span className="sr-only">shahriyar.dev — home</span>

      {/* Reserve the final width so the header never reflows mid-type */}
      <span aria-hidden="true" className="grid">
        <span className="invisible col-start-1 row-start-1 whitespace-pre">
          ❯ {TEXT}
        </span>

        <span className="col-start-1 row-start-1 whitespace-pre">
          <span
            style={{ color: PROMPT }}
            className="transition-opacity group-hover:opacity-70"
          >
            ❯{" "}
          </span>
          <span className="transition-colors group-hover:text-muted-foreground">
            {typed}
          </span>
          <span
            className={`ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-foreground/70 ${
              done ? "animate-pulse" : ""
            }`}
          />
        </span>
      </span>
    </Link>
  )
}
