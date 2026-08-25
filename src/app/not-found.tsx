import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-28">
      <div className="flex w-full max-w-xl flex-col items-start gap-4">
        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
          404
        </p>
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          This page doesn&apos;t exist, or it moved.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Browse the blog</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
