"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { trpc } from "@/lib/trpc/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  postId: string
  postSlug: string
}

export function Comments({ postId, postSlug }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; name: string; role?: string; image?: string | null } | null>(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  const { data: comments, refetch } = trpc.comment.list.useQuery({ postId })

  const createComment = trpc.comment.create.useMutation({
    onSuccess: () => {
      setContent("")
      refetch()
    },
  })

  const deleteComment = trpc.comment.delete.useMutation({
    onSuccess: () => refetch(),
  })

  useEffect(() => {
    authClient.getSession().then(({ data }) => {
      if (data) setUser(data.user as typeof user)
      setSessionLoaded(true)
    })
  }, [])

  const isAdmin = user?.role === "admin"

  const handleSubmit = async () => {
    if (!content.trim() || !user || submitting) return
    setSubmitting(true)
    setError("")
    try {
      await createComment.mutateAsync({
        content: content.trim(),
        userId: user.id,
        postId,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to post comment")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (commentId: string) => {
    if (!user || deleting) return
    setDeleting(commentId)
    try {
      await deleteComment.mutateAsync({ commentId, userId: user.id })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="mt-20 border-t pt-12">
      <h2 className="text-2xl font-bold tracking-tight">
        Comments{comments?.length ? ` (${comments.length})` : ""}
      </h2>

      {!sessionLoaded ? null : !user ? (
        <div className="mt-6 rounded-lg border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Sign in to leave a comment.
          </p>
          <Button
            size="sm"
            className="mt-3"
            onClick={() => router.push(`/auth/login?callbackURL=/blog/${postSlug}`)}
          >
            Sign in with GitHub
          </Button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Commenting as <span className="font-medium">{user.name}</span>
            </p>
            <Button size="sm" onClick={handleSubmit} disabled={!content.trim() || submitting}>
              {submitting ? "Posting..." : "Post comment"}
            </Button>
          </div>
        </div>
      )}

      {comments && comments.length > 0 && (
        <div className="mt-8 flex flex-col gap-5">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="size-8 shrink-0 overflow-hidden rounded-full bg-muted">
                {comment.user.image ? (
                  <img
                    src={comment.user.image}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                    {comment.user.name?.charAt(0) ?? "?"}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
              {user && (comment.userId === user.id || isAdmin) && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={deleting === comment.id}
                  className="self-start text-xs text-muted-foreground transition-colors hover:text-destructive"
                >
                  {deleting === comment.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
