"use client"

import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Resource {
  term: string
  url: string
  description: string
}

export function ResourceLinks({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null

  return (
    <div className="mt-8">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Resources
      </h3>
      <div className="flex flex-col gap-1.5">
        {resources.map((r) => (
          <Popover key={r.term}>
            <PopoverTrigger asChild>
              <button className="block text-left text-xs text-muted-foreground transition-colors hover:text-foreground">
                {r.term}
              </button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-56">
              <PopoverHeader>
                <PopoverTitle>{r.term}</PopoverTitle>
                <PopoverDescription>{r.description}</PopoverDescription>
              </PopoverHeader>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-xs font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                Open ↗
              </a>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
}
