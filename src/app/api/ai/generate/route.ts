import { NextResponse } from "next/server"
import { env } from "@/lib/env"

const DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

export async function POST(request: Request) {
  const { prompt, systemPrompt } = await request.json()

  if (!env.DEEPSEEK_API_KEY) {
    return NextResponse.json({ error: "DeepSeek API key not configured" }, { status: 400 })
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
      stream: false,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json({ content: data.choices[0]?.message?.content ?? "" })
}
