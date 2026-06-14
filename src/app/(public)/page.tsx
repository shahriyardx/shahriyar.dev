import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { SkillsPreview } from "@/components/skills-preview"
import { CTASection } from "@/components/cta-section"

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
      <SkillsPreview />
      <FeaturedProjects />
      {popular.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
              Popular posts
            </h2>
            <div className="flex flex-col gap-4">
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
          </div>
        </section>
      )}
      <CTASection />
    </>
  )
}
