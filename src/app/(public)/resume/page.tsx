import { resumeData } from "@/lib/resume-data"
import { ResumeDownload } from "@/components/resume-download"
import { Icon } from "@/components/icon-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume — Shahriyar",
  description: "Full-stack developer resume",
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

export default function ResumePage() {
  const { name, title, summary, experience, education, skills, email, website, location } = resumeData

  return (
    <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">{name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{title}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Envelope" size={13} />
              {email}
            </a>
            <span className="flex items-center gap-1.5">
              <Icon name="MapPin" size={13} />
              {location}
            </span>
            <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Icon name="Globe" size={13} />
              {website}
            </a>
          </div>
        </div>
        <ResumeDownload />
      </div>

      <div id="resume-content" className="flex flex-col gap-10">
        <Section title="Summary">
          <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
        </Section>

        <Section title="Experience">
          <div className="flex flex-col gap-6">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} — {exp.location}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 flex flex-col gap-1">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="flex flex-col gap-4">
            {education.map((edu, i) => (
              <div key={i} className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Skills">
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="border px-2.5 py-1 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
