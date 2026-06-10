export interface TOCItem {
  level: number
  text: string
  id: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function extractTOC(content: string): TOCItem[] {
  const items: TOCItem[] = []
  const lines = content.split("\n")
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = slugify(text)
      if (items.some((i) => i.id === id)) continue
      items.push({ level, text, id })
    }
  }
  return items
}
