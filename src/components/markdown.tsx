import { parse } from "comark/parse"
import { ComarkRenderer } from "@comark/react"
import { codeToHtml } from "shiki"

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

export async function Markdown({ children }: { children: string }) {
  const tree = await parse(children)
  annotateHeadings(tree.nodes)
  await highlightTree(tree.nodes)
  return <ComarkRenderer tree={tree} className="prose prose-invert max-w-none" />
}
