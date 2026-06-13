export async function generateContent(topic: string, tone = "professional"): Promise<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: `You are a ${tone} blog writer. Write a complete blog post in markdown format. Use headings (H2-H6), bullet points, and code blocks where appropriate. Never use emoji in headings. Do not include any heading (H1-H6) at the start of the content — begin with a paragraph. Place headings further down only after some body text. Keep headings clean and text-only.`,
      prompt: `Write a blog post about: ${topic}`,
      stream: false,
    }),
  })

  if (!res.ok) throw new Error("Failed to generate content")
  const data = await res.json()
  return data.content
}

export async function* generateContentStream(topic: string, tone = "professional"): AsyncGenerator<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: `You are a ${tone} blog writer. Write a complete blog post in markdown format. Use headings (H2-H6), bullet points, and code blocks where appropriate. Never use emoji in headings. Do not include any heading (H1-H6) at the start of the content — begin with a paragraph. Place headings further down only after some body text. Keep headings clean and text-only.`,
      prompt: `Write a blog post about: ${topic}`,
      stream: true,
    }),
  })

  if (!res.ok) throw new Error("Failed to generate content")

  const reader = res.body?.getReader()
  if (!reader) throw new Error("No response body")

  const decoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    yield decoder.decode(value, { stream: true })
  }
}

export async function generateExcerpt(content: string): Promise<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: "Summarize the following blog post in 1-2 sentences as a compelling excerpt.",
      prompt: content,
      stream: false,
    }),
  })

  if (!res.ok) throw new Error("Failed to generate excerpt")
  const data = await res.json()
  return data.content
}

export async function suggestTags(content: string): Promise<string[]> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: "Suggest 3-6 relevant tags for this blog post. Return them as a comma-separated list, nothing else.",
      prompt: content,
      stream: false,
    }),
  })

  if (!res.ok) throw new Error("Failed to suggest tags")
  const data = await res.json()
  return data.content.split(",").map((t: string) => t.trim()).filter(Boolean)
}

export async function suggestTitle(topic: string): Promise<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: "Suggest a compelling blog post title for the given topic. Return only the title, nothing else.",
      prompt: topic,
      stream: false,
    }),
  })

  if (!res.ok) throw new Error("Failed to suggest title")
  const data = await res.json()
  return data.content
}
