import { env } from "@/lib/env"

const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

async function callDeepSeek(systemPrompt: string, prompt: string): Promise<string> {
  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
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
    "Extract 3-5 key takeaways from this blog post. Return as a JSON array of strings, nothing else. Example: [\"Takeaway one\", \"Takeaway two\"]",
    content,
  )
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed)) return JSON.stringify(parsed)
  } catch {}
  return text
}
