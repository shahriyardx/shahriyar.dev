import { prisma } from "@/lib/prisma"
import { resumeData } from "@/lib/resume-data"
import { ResumeDownload } from "@/components/resume-download"
import { Icon } from "@/components/icon-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume — Shahriyar",
  description: "Web developer resume",
}

export default async function ResumePage() {
  const { name, phone, email, title, website, skills, languages, technologies, experience, courses } = resumeData
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  })

  return (
    <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">{name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{title}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" size={13} />
              {phone}
            </span>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Envelope" size={13} />
              {email}
            </a>
            <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Globe" size={13} />
              {website}
            </a>
          </div>
        </div>
        <ResumeDownload />
      </div>

      <div id="resume-content" className="flex flex-col gap-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="border px-3 py-1 text-sm">{s}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((l) => (
              <span key={l} className="border px-3 py-1 text-sm">{l}</span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span key={t} className="border px-3 py-1 text-sm">{t}</span>
            ))}
          </div>
        </section>

        {projects.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Projects</h2>
            <div className="flex flex-col gap-6">
              {projects.map((p) => (
                <div key={p.id}>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  {p.url && (
                    <div className="mt-1.5 flex items-center gap-3 text-sm">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground">
                        Live Site
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Experience</h2>
          <div className="flex flex-col gap-6">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold">{exp.company}</h3>
                    <span className="shrink-0 text-sm text-muted-foreground">
                      {exp.startDate} — {exp.endDate ?? "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.address}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-foreground">Position:</span> {exp.role}
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
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Courses</h2>
          <div className="flex flex-col gap-4">
            {courses.map((c, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.institution}</p>
                </div>
                <div className="shrink-0 text-right text-sm text-muted-foreground">
                  <p>{c.type}</p>
                  <p>{c.startDate} — {c.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
