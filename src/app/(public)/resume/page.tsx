import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import { resumeData } from "@/lib/resume-data"
import { ResumeDownload } from "@/components/resume-download"
import { Icon } from "@/components/icon-wrapper"
import { Cmd, PROMPT } from "@/components/terminal"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Web developer specializing in React, Next.js, Node.js, and modern web technologies. View my experience, projects, and skills.",
}

/** A section header, printed like a shell heading with a rule after it. */
function Block({
  cmd,
  title,
  children,
}: {
  cmd: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Cmd>{cmd}</Cmd>
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-semibold tracking-widest uppercase">
            {title}
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
      {children}
    </section>
  )
}

/** Values rendered as a shell array: (one two three) */
function TokenList({ items }: { items: string[] }) {
  return (
    <p className="text-sm leading-7">
      <span className="text-muted-foreground/40" aria-hidden="true">
        ({" "}
      </span>
      {items.map((item, i) => (
        <span key={item}>
          <span className="text-muted-foreground transition-colors hover:text-foreground">
            {item}
          </span>
          {i < items.length - 1 && (
            <span className="text-muted-foreground/25"> · </span>
          )}
        </span>
      ))}
      <span className="text-muted-foreground/40" aria-hidden="true">
        {" "}
        )
      </span>
    </p>
  )
}

export default async function ResumePage() {
  const {
    name,
    phone,
    email,
    title,
    website,
    skills,
    languages,
    technologies,
    experience,
    courses,
  } = resumeData

  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Cmd>cat ./resume.md</Cmd>
          <h1 className="text-[clamp(1.75rem,5vw,2.75rem)] leading-none font-black tracking-tight">
            {name}
          </h1>
          <p className="text-muted-foreground">
            <span style={{ color: PROMPT }} aria-hidden="true">
              #{" "}
            </span>
            {title}
          </p>

          <div className="mt-1 flex flex-col gap-1.5 text-xs text-muted-foreground">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Icon name="Phone" size={11} />
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Icon name="Envelope" size={11} />
              {email}
            </a>
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Icon name="Globe" size={11} />
              {website}
            </a>
          </div>
        </div>

        <ResumeDownload />
      </div>

      <div id="resume-content" className="mt-14 flex flex-col gap-12">
        <Block cmd="echo $SKILLS" title="Skills">
          <TokenList items={skills} />
        </Block>

        <Block cmd="echo $TECHNOLOGIES" title="Technologies">
          <TokenList items={technologies} />
        </Block>

        <Block cmd="echo $LANGUAGES" title="Languages">
          <TokenList items={languages} />
        </Block>

        {/* Experience, as a git-log-ish timeline */}
        <Block cmd="git log --author=shahriyar" title="Experience">
          <div className="flex flex-col">
            {experience.map((exp) => (
              <div
                key={`${exp.company}-${exp.startDate}`}
                className="relative border-l pb-8 pl-6 last:pb-0"
              >
                {/* The commit dot */}
                <span
                  className="absolute -left-[4.5px] top-1.5 size-2 rounded-full"
                  style={{ backgroundColor: PROMPT }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-1">
                  <p className="text-xs tabular-nums text-muted-foreground/60">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </p>
                  <h3 className="font-bold tracking-tight">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} · {exp.address}
                  </p>
                </div>

                <ul className="mt-3 flex flex-col gap-1.5">
                  {exp.responsibilities.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="shrink-0 text-muted-foreground/30"
                        aria-hidden="true"
                      >
                        -
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        {projects.length > 0 && (
          <Block cmd="ls ./projects" title="Projects">
            <div className="flex flex-col gap-px overflow-hidden border">
              {projects.map((p) => (
                <div key={p.id} className="bg-card p-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-sm font-semibold tracking-tight">
                      <span
                        className="text-muted-foreground/40"
                        aria-hidden="true"
                      >
                        ./
                      </span>
                      {p.title}
                    </h3>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        live ↗
                      </a>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </Block>
        )}

        <Block cmd="cat ./education.txt" title="Courses">
          <div className="flex flex-col gap-4">
            {courses.map((c) => (
              <div
                key={`${c.name}-${c.startDate}`}
                className="flex flex-col gap-1 border-l pl-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-sm font-semibold tracking-tight">
                    {c.name}
                  </h3>
                  <span className="text-xs tabular-nums text-muted-foreground/60">
                    {c.startDate} — {c.endDate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {c.institution}
                  <span className="text-muted-foreground/40"> · {c.type}</span>
                </p>
              </div>
            ))}
          </div>
        </Block>
      </div>
    </div>
  )
}
