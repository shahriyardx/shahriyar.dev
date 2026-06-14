import { env } from "@/lib/env"

const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

export async function callDeepSeek(
  systemPrompt: string,
  prompt: string,
): Promise<string> {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      stream: false,
    }),
  })

  if (!res.ok) throw new Error("AI service unavailable")
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ""
}

export async function generateTLDR(content: string): Promise<string> {
  return callDeepSeek(
    "Summarize the following blog post in 1-2 sentences as a TLDR. Be concise and informative. Return only the TLDR text, nothing else.",
    content,
  )
}

export async function generateKeyTakeaways(content: string): Promise<string> {
  const text = await callDeepSeek(
    'Extract 3-5 key takeaways from this blog post. Return as a JSON array of strings, nothing else. Example: ["Takeaway one", "Takeaway two"]',
    content,
  )
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed)) return JSON.stringify(parsed)
  } catch {}
  return text
}

export async function generateAutoReplyComment(params: {
  postTitle: string
  postContent: string
  commentContent: string
}): Promise<{ shouldReply: boolean; replyText?: string; reason?: string }> {
  const systemPrompt =
    "You are a thoughtful blog author. A reader commented on your blog post. " +
    "Decide if the comment deserves a reply. Reply ONLY if it: asks a substantive question, " +
    "raises a counterpoint, shares relevant experience, invites discussion, or points out something " +
    'you missed. Do NOT reply if it is: pure praise ("Great post!"), simple agreement, spam, ' +
    "off-topic, a question already answered in the post, emoji-only, or very low effort. " +
    "If you reply, write 2-4 sentences as the blog author — conversational and helpful. " +
    "Use proper markdown: wrap inline code in backticks, code blocks in triple backticks with language. " +
    'Respond with valid JSON only: {"shouldReply": boolean, "replyText": "string or empty", "reason": "short justification"}'

  const prompt =
    `--- BLOG POST TITLE ---\n${params.postTitle}\n\n` +
    `--- BLOG POST CONTENT ---\n${params.postContent}\n\n` +
    `--- READER COMMENT ---\n${params.commentContent}`

  const raw = await callDeepSeek(systemPrompt, prompt)
  try {
    return JSON.parse(raw)
  } catch {
    return { shouldReply: false, reason: "Failed to parse AI response" }
  }
}

export async function generateResources(
  content: string,
): Promise<{ term: string; url: string; description: string }[]> {
  const systemPrompt =
    "You are a technical blog resource curator. Analyze the blog post content and identify the key " +
    "technologies, tools, frameworks, and concepts mentioned. For each, provide the official resource " +
    "link. Return up to 5 items as a JSON array, nothing else. " +
    'Format: [{"term": "React", "url": "https://react.dev", "description": "Official React docs and guides"}, ...]'

  const raw = await callDeepSeek(systemPrompt, content)
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.slice(0, 5)
  } catch {}
  return []
}
