import { parse } from "comark/parse"
import { ComarkRenderer } from "@comark/react"
import { codeToHtml } from "shiki"

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
  await highlightTree(tree.nodes)
  return <ComarkRenderer tree={tree} className="prose prose-invert max-w-none" />
}
