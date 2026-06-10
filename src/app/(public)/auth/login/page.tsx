"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data) router.push("/dashboard")
    })
  }, [router])

  const login = async () => {
    setLoading(true)
    setError("")
    const { error: err } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    })
    if (err) {
      setError(err.message ?? err.statusText ?? "Login failed")
      setLoading(false)
    }
  }

  return (
    <Section className="flex min-h-screen items-center justify-center pt-28">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Admin login</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with GitHub to access the dashboard.
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button size="lg" className="w-full" onClick={login} disabled={loading}>
          {loading ? "Redirecting..." : "Continue with GitHub"}
        </Button>
      </div>
    </Section>
  )
}
