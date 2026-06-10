import { ImageResponse } from "next/og"
import { prisma } from "@/lib/prisma"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Blog post"

interface Props {
  params: Promise<{ slug: string }>
}

async function loadFont(weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&display=swap`,
  ).then((r) => r.text())
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1]
  if (!url) throw new Error(`Geist ${weight} font URL not found`)
  return fetch(url).then((r) => r.arrayBuffer())
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  const title = post?.title ?? "Shahriyar.dev"
  const tags = post?.tags ?? []

  const [regular, bold, black] = await Promise.all([
    loadFont(400).catch(() => new ArrayBuffer(0)),
    loadFont(700).catch(() => new ArrayBuffer(0)),
    loadFont(900).catch(() => new ArrayBuffer(0)),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          color: "white",
        }}
      >
        {tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 20,
                  color: "#a1a1aa",
                  border: "1px solid #27272a",
                  padding: "4px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 28, color: "#71717a", marginTop: 32 }}>
          shahriyar.dev
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        regular.byteLength ? { name: "Geist", data: regular, weight: 400 } : null,
        bold.byteLength ? { name: "Geist", data: bold, weight: 700 } : null,
        black.byteLength ? { name: "Geist", data: black, weight: 900 } : null,
      ].filter(Boolean) as any,
    },
  )
}
