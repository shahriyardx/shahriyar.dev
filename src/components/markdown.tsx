import { parse } from "comark/parse"
import { ComarkRenderer } from "@comark/react"
import { codeToHtml } from "shiki"

interface Resource {
  term: string
  url: string
  description: string
}

function extractText(node: unknown): string {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.slice(2).map(extractText).join("")
  return ""
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function annotateHeadings(nodes: unknown[]): void {
  for (const node of nodes) {
    if (Array.isArray(node)) {
      const tag = node[0] as string
      if (/^h[1-6]$/.test(tag)) {
        const text = extractText(node)
        const id = slugify(text)
        if (id) {
          const props = (node[1] ?? {}) as Record<string, unknown>
          props.id = id
          node[1] = props
        }
      }
      for (let i = 1; i < node.length; i++) {
        if (Array.isArray(node[i])) annotateHeadings([node[i] as unknown[]])
      }
    }
  }
}

async function highlightTree(nodes: unknown[]): Promise<void> {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (Array.isArray(node) && node[0] === "pre" && node[1]?.language) {
      const lang = node[1].language
      const codeNode = node[2]
      const code = Array.isArray(codeNode) ? codeNode[2] ?? "" : ""
      const html = await codeToHtml(code, { lang, theme: "github-dark" })
      nodes[i] = ["div", { class: "not-prose my-6 overflow-hidden rounded border text-sm" },
        lang !== "text" ? ["div", { class: "flex items-center justify-between border-b bg-muted/30 px-4 py-1.5" },
          ["span", { class: "text-xs text-muted-foreground" }, lang],
        ] : null,
        ["div", { class: "overflow-x-auto bg-muted/30 [&>pre]:p-4 [&>pre]:leading-relaxed [&>pre]:text-xs [&>pre]:!bg-transparent", dangerouslySetInnerHTML: { __html: html } }],
      ].filter(Boolean)
    }
  }
}

function annotateResources(nodes: unknown[], resources: Resource[]): void {
  for (let n = 0; n < nodes.length; n++) {
    const node = nodes[n]
    if (Array.isArray(node)) {
      const tag = node[0] as string
      if (tag === "pre" || tag === "code" || tag === "a") continue

      const start = typeof node[1] === "object" && !Array.isArray(node[1]) ? 2 : 1

      // Recurse into child arrays first
      for (let i = start; i < node.length; i++) {
        if (Array.isArray(node[i])) annotateResources([node[i] as unknown[]], resources)
      }

      // Rebuild children, splitting text nodes at resource term boundaries
      const newChildren = node.slice(0, start)
      for (let i = start; i < node.length; i++) {
        const child = node[i]
        if (typeof child !== "string") {
          newChildren.push(child)
          continue
        }
        let text = child as string
        let matched = false
        for (const res of resources) {
          const idx = text.toLowerCase().indexOf(res.term.toLowerCase())
          if (idx === -1) continue
          if (idx > 0) newChildren.push(text.slice(0, idx))
          newChildren.push([
            "a",
            {
              href: res.url,
              target: "_blank",
              rel: "noopener noreferrer",
              class:
                "underline decoration-dotted underline-offset-2 decoration-muted-foreground/40 hover:decoration-foreground",
            },
            res.term,
          ])
          const after = text.slice(idx + res.term.length)
          if (after) newChildren.push(after)
          matched = true
          break
        }
        if (!matched) newChildren.push(child)
      }

      // Replace in place
      node.length = 0
      for (let i = 0; i < newChildren.length; i++) node.push(newChildren[i])
    }
  }
}

export async function Markdown({ children, resources }: { children: string; resources?: string }) {
  const parsed: Resource[] = resources ? safeParse(resources) : []
  const tree = await parse(children)
  annotateHeadings(tree.nodes)
  await highlightTree(tree.nodes)
  if (parsed.length > 0) annotateResources(tree.nodes, parsed)
  return <ComarkRenderer tree={tree} className="prose prose-invert max-w-none" />
}

function safeParse(json: string): Resource[] {
  try {
    const parsed = JSON.parse(json)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
