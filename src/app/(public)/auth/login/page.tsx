"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center pt-28" />
    }>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackURL = searchParams.get("callbackURL") ?? "/admin"
  // Only the dashboard/admin flows get the admin framing; readers signing in
  // to comment see a plain public login.
  const isAdminLogin =
    callbackURL.startsWith("/admin") || callbackURL.startsWith("/dashboard")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data) router.push(callbackURL)
    })
  }, [router, callbackURL])

  const login = async () => {
    setLoading(true)
    setError("")
    const { error: err } = await authClient.signIn.social({
      provider: "github",
      callbackURL,
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
          <h1 className="text-2xl font-medium tracking-tight">
            {isAdminLogin ? "Admin login" : "Sign in"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAdminLogin
              ? "Sign in with GitHub to access the dashboard."
              : "Sign in with GitHub to join the conversation."}
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
