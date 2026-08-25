import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"

export interface Project {
  title: string
  description: string
  url: string
  tags: string[]
}

const toHost = (url: string) => {
  try {
    return new URL(url).host.replace(/^www\./, "")
  } catch {
    return url
  }
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border p-5 transition-colors hover:border-foreground/25 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-sans font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground/60">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-0 items-center gap-1 border-t pt-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="truncate">{toHost(project.url)}</span>
          <ArrowUpRight size={12} className="shrink-0" />
        </a>
      </div>
    </article>
  )
}
