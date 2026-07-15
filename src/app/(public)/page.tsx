import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { TerminalHero } from "@/components/terminal-hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { SkillsPreview } from "@/components/skills-preview"
import { CTASection } from "@/components/cta-section"
import { Section } from "@/components/section"
import { Cmd } from "@/components/terminal"
import { buildFs } from "@/lib/shell/fs"
import { apps } from "@/app/apps/apps"

/** Section headings read as shell commands, to match the hero. */
function CommandHeading({
  cmd,
  children,
}: {
  cmd: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <Cmd>{cmd}</Cmd>
      {children}
    </div>
  )
}

export default async function Home() {
  const [popular, allPosts, projects] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { views: "desc" },
      take: 3,
      select: { slug: true, title: true, views: true },
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: { slug: true, title: true, excerpt: true, tags: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: { title: true, description: true, url: true, tags: true },
    }),
  ])

  // The shell reads the same data the pages do, so it can never drift.
  const fs = buildFs({ apps, posts: allPosts, projects })

  return (
    <>
      <TerminalHero fs={fs} />

      <Section id="apps">
        <CommandHeading cmd="ls ./apps">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Things I&apos;ve shipped
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Each one runs on your own device — no accounts, no tracking.
          </p>
        </CommandHeading>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="group flex items-start gap-4 border p-5 transition-colors"
              style={{ borderColor: `${app.accent}26` }}
            >
              <Image
                src={app.icon}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold tracking-tight">{app.name}</h3>
                  <span
                    className="text-[10px] uppercase tracking-widest"
                    style={{ color: app.accent }}
                  >
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
          <CommandHeading cmd="cat ./blog | head -3">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Popular posts
            </h2>
          </CommandHeading>

          <div className="mt-6 flex flex-col gap-4">
            {popular.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-4 border-b pb-4"
              >
                <span className="text-3xl font-black tabular-nums text-muted-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold tracking-tight transition-colors group-hover:text-muted-foreground">
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
            className="mt-6 inline-flex text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all posts →
          </Link>
        </Section>
      )}

      <CTASection />
    </>
  )
}
