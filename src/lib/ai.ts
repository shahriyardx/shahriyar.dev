export async function generateContent(topic: string, tone = "professional"): Promise<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: `You are a ${tone} blog writer. Write a complete blog post in markdown format. Use headings, bullet points, and code blocks where appropriate.`,
      prompt: `Write a blog post about: ${topic}`,
    }),
  })

  if (!res.ok) throw new Error("Failed to generate content")
  const data = await res.json()
  return data.content
}

export async function generateExcerpt(content: string): Promise<string> {
  const res = await fetch("/api/ai/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt: "Summarize the following blog post in 1-2 sentences as a compelling excerpt.",
      prompt: content,
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
    }),
  })

  if (!res.ok) throw new Error("Failed to suggest title")
  const data = await res.json()
  return data.content
}
