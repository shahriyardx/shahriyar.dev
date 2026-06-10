import { prisma } from "@/lib/prisma"
import { resumeData } from "@/lib/resume-data"
import { ResumeDownload } from "@/components/resume-download"
import { Icon } from "@/components/icon-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume — Shahriyar",
  description: "Web developer resume",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      {children}
    </section>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border bg-muted/30 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  )
}

export default async function ResumePage() {
  const { name, phone, email, title, website, skills, languages, technologies, experience, courses } = resumeData
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })

  return (
    <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight">{name}</h1>
          <p className="mt-1.5 text-base text-muted-foreground">{title}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Phone" size={11} />
              {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Envelope" size={11} />
              {email}
            </a>
            <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Globe" size={11} />
              {website}
            </a>
          </div>
        </div>
        <ResumeDownload />
      </div>

      <div id="resume-content" className="flex flex-col gap-8">
        <Section title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </Section>

        <Section title="Languages">
          <div className="flex flex-wrap gap-1.5">
            {languages.map((l) => <Tag key={l}>{l}</Tag>)}
          </div>
        </Section>

        <Section title="Technologies">
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </Section>

        {projects.length > 0 && (
          <Section title="Projects">
            <div className="flex flex-col gap-5">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{p.title}</h3>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
                        Live Site &rarr;
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Experience">
          <div className="flex flex-col gap-6">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {exp.startDate} — {exp.endDate ?? "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} — {exp.address}
                  </p>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Courses">
          <div className="flex flex-col gap-4">
            {courses.map((c, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.institution}</p>
                </div>
                <div className="shrink-0 text-right text-xs text-muted-foreground">
                  <p>{c.type}</p>
                  <p>{c.startDate} — {c.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
