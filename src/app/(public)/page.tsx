import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { SkillsPreview } from "@/components/skills-preview"
import { CTASection } from "@/components/cta-section"
import { Section } from "@/components/section"
import { SectionHeader } from "@/components/page-header"
import { apps } from "@/app/apps/apps"

export default async function Home() {
  const popular = await prisma.post.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 3,
    select: { slug: true, title: true, views: true },
  })

  return (
    <>
      <Hero />

      <Section id="apps">
        <SectionHeader eyebrow="Apps" title="Things I've shipped">
          Each one runs on your own device — no accounts, no tracking.
        </SectionHeader>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="group flex items-start gap-4 border p-5 transition-colors hover:border-foreground/25"
            >
              <Image
                src={app.icon}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="font-sans font-semibold tracking-tight">
                    {app.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                    {app.platforms[0]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{app.tagline}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/apps"
          className="mt-8 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See all apps →
        </Link>
      </Section>

      <SkillsPreview />
      <FeaturedProjects />

      {popular.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Writing" title="Popular posts" />

          <div className="mt-8 flex flex-col gap-4">
            {popular.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline gap-4 border-b pb-4"
              >
                <span className="font-mono text-sm tabular-nums text-muted-foreground/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="tracking-tight transition-colors group-hover:text-muted-foreground">
                    {post.title.replace(/^["'“”]+|["'“”]+$/g, "").trim()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.views} view{post.views === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/blog"
            className="mt-8 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all posts →
          </Link>
        </Section>
      )}

      <CTASection />
    </>
  )
}
