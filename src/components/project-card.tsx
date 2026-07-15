import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
import { PROMPT } from "@/components/terminal"

export interface Project {
  title: string
  description: string
  url: string
  tags: string[]
}

/** `My Cool App` -> `my-cool-app`, so each project reads as a directory. */
const toSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const toHost = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border bg-card transition-colors hover:border-foreground/25">
      {/* File path, as a window title bar */}
      <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-2">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="truncate text-xs text-muted-foreground">
          ~/projects/{toSlug(project.title)}
        </span>
      </div>

      <div className="flex flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">
            <span style={{ color: PROMPT }} aria-hidden="true">
              ❯{" "}
            </span>
            cat README.md
          </p>

          <h3 className="text-lg font-bold tracking-tight">
            <span className="text-muted-foreground/40" aria-hidden="true">
              #{" "}
            </span>
            {project.title}
          </h3>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground/60">
            {project.tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}

        {/* The last line of the session: opening it */}
        <div className="flex items-center justify-between gap-4 border-t pt-4">
          <p className="min-w-0 truncate text-xs text-muted-foreground">
            <span style={{ color: PROMPT }} aria-hidden="true">
              ❯{" "}
            </span>
            open {toHost(project.url)}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 border px-3 py-1.5 text-xs transition-colors hover:border-foreground/30 hover:bg-muted/40"
          >
            Live site
            <ArrowUpRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  )
}
