import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cursor, Pane, PROMPT } from "@/components/terminal"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-28">
      <div className="w-full max-w-xl">
        <Pane title="shahriyar@dev — ~ — zsh">
          <div className="flex flex-col gap-1 text-sm">
            <p>
              <span style={{ color: PROMPT }} aria-hidden="true">
                ❯{" "}
              </span>
              cd ./this-page
            </p>
            <p className="text-[#F87171]">
              cd: no such file or directory: ./this-page
            </p>

            <p className="mt-4">
              <span style={{ color: PROMPT }} aria-hidden="true">
                ❯{" "}
              </span>
              echo $?
            </p>
            <h1 className="text-6xl font-black tracking-tight md:text-7xl">
              404
            </h1>

            <p className="mt-4 text-muted-foreground">
              This page doesn&apos;t exist, or it moved.
            </p>

            <p className="mt-4" aria-hidden="true">
              <span style={{ color: PROMPT }}>❯ </span>
              <Cursor />
            </p>
          </div>
        </Pane>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">cd ~</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Browse the blog</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
