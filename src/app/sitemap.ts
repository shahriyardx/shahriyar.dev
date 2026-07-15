import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"
import { apps } from "@/app/apps/apps"

export const dynamic = "force-dynamic"

const BASE = "https://shahriyar.dev"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const [posts, projectCount] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.count({ where: { published: true } }),
  ])

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: BASE, changeFrequency: "monthly", priority: 1 },
      { url: `${BASE}/apps`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${BASE}/resume`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.6 },
    ] as const
  ).map((page) => ({ ...page, lastModified: now }))

  // /projects renders nothing when there's nothing published — don't advertise it.
  if (projectCount > 0) {
    staticPages.push({
      url: `${BASE}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  }

  // Derived from the registry, so a new app lands here automatically.
  const appPages: MetadataRoute.Sitemap = apps.flatMap((app) => [
    {
      url: `${BASE}/apps/${app.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...(app.privacy
      ? [
          {
            url: `${BASE}/apps/${app.slug}/privacy`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.4,
          },
        ]
      : []),
  ])

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...appPages, ...postPages]
}
