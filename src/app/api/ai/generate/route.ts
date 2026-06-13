import { env } from "@/lib/env"

const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

export async function POST(request: Request) {
  const { prompt, systemPrompt, stream = false } = await request.json()

  if (!env.DEEPSEEK_API_KEY) {
    return Response.json({ error: "DeepSeek API key not configured" }, { status: 400 })
  }

  const res = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt ?? "You are a helpful writing assistant." },
        { role: "user", content: prompt },
      ],
      stream: true,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return Response.json({ error: err }, { status: 500 })
  }

  if (!stream) {
    const data = await res.json()
    return Response.json({ content: data.choices[0]?.message?.content ?? "" })
  }

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const reader = res.body?.getReader()
  if (!reader) return Response.json({ error: "No response body" }, { status: 500 })

  const readable = new ReadableStream({
    async start(controller) {
      let buffer = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6)
          if (data === "[DONE]") continue
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            if (delta) {
              controller.enqueue(encoder.encode(delta))
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  })
}
