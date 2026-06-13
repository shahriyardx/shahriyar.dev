"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChatDots } from "@phosphor-icons/react"
import { authClient } from "@/lib/auth-client"
import { trpc } from "@/lib/trpc/client"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/server/routers/_app"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type RouterOutputs = inferRouterOutputs<AppRouter>
type CommentWithReplies = RouterOutputs["comment"]["list"][number]
type Reply = NonNullable<CommentWithReplies["replies"]>[number]

interface Props {
  postId: string
  postSlug: string
}

function CommentBlock({
  comment,
  user,
  isAdmin,
  onReply,
  onDelete,
  replyTo,
  replyContent,
  replySubmitting,
  onReplyContentChange,
  onReplySubmit,
  onCancelReply,
  deleting,
}: {
  comment: CommentWithReplies
  user: { id: string; name: string; image?: string | null } | null
  isAdmin: boolean
  onReply: (id: string) => void
  onDelete: (id: string) => void
  replyTo: string | null
  replyContent: string
  replySubmitting: boolean
  onReplyContentChange: (v: string) => void
  onReplySubmit: (parentId: string) => void
  onCancelReply: () => void
  deleting: string | null
}) {
  const isReplying = replyTo === comment.id
  const total = 1 + (comment.replies?.length ?? 0)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="size-8 shrink-0 overflow-hidden rounded-full bg-muted">
          {comment.user.image ? (
            <img src={comment.user.image} alt="" className="size-full object-cover" />
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
                year: "numeric", month: "short", day: "numeric",
              })}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{comment.content}</p>
          {user && (
            <button
              onClick={() => onReply(comment.id)}
              className="mt-1 self-start text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Reply
            </button>
          )}
        </div>
        {user && (comment.userId === user.id || isAdmin) && (
          <button
            onClick={() => onDelete(comment.id)}
            disabled={deleting === comment.id}
            className="self-start text-xs text-muted-foreground transition-colors hover:text-destructive"
          >
            {deleting === comment.id ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>

      {isReplying && user && (
        <div className="ml-11 flex flex-col gap-2">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => onReplyContentChange(e.target.value)}
            rows={2}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onReplySubmit(comment.id)} disabled={!replyContent.trim() || replySubmitting}>
              {replySubmitting ? "Posting..." : "Post reply"}
            </Button>
            <Button size="sm" variant="ghost" onClick={onCancelReply}>Cancel</Button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 flex flex-col gap-3 border-l pl-4">
          {comment.replies.map((reply: Reply) => (
            <div key={reply.id} className="flex gap-3">
              <div className="size-7 shrink-0 overflow-hidden rounded-full bg-muted">
                {reply.user.image ? (
                  <img src={reply.user.image} alt="" className="size-full object-cover" />
                ) : (
                  <div className="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">
                    {reply.user.name?.charAt(0) ?? "?"}
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{reply.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(reply.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{reply.content}</p>
              </div>
              {user && (reply.userId === user.id || isAdmin) && (
                <button
                  onClick={() => onDelete(reply.id)}
                  disabled={deleting === reply.id}
                  className="self-start text-xs text-muted-foreground transition-colors hover:text-destructive"
                >
                  {deleting === reply.id ? "Deleting..." : "Delete"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Comments({ postId, postSlug }: Props) {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; name: string; role?: string; image?: string | null } | null>(null)
  const [sessionLoaded, setSessionLoaded] = useState(false)
  const [content, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [replySubmitting, setReplySubmitting] = useState(false)
  const [replyError, setReplyError] = useState("")

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

  const totalComments = comments?.reduce((sum, c) => sum + 1 + (c.replies?.length ?? 0), 0) ?? 0

  const handleSubmit = async () => {
    if (!content.trim() || !user || submitting) return
    setSubmitting(true)
    setError("")
    try {
      await createComment.mutateAsync({ content: content.trim(), userId: user.id, postId })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to post comment")
    } finally {
      setSubmitting(false)
    }
  }

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim() || !user || replySubmitting) return
    setReplySubmitting(true)
    setReplyError("")
    try {
      await createComment.mutateAsync({ content: replyContent.trim(), userId: user.id, postId, parentId })
      setReplyContent("")
      setReplyTo(null)
    } catch (e) {
      setReplyError(e instanceof Error ? e.message : "Failed to post reply")
    } finally {
      setReplySubmitting(false)
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
      <div className="flex items-center gap-2">
        <ChatDots size={20} weight="bold" />
        <h2 className="text-2xl font-bold tracking-tight">
          Comments{totalComments > 0 ? ` (${totalComments})` : ""}
        </h2>
      </div>

      {!sessionLoaded ? null : !user ? (
        <div className="mt-6 rounded-lg border p-6 text-center">
          <p className="text-sm text-muted-foreground">Sign in to leave a comment.</p>
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
          {error && <p className="text-sm text-destructive">{error}</p>}
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
        <div className="mt-8 flex flex-col gap-6">
          {comments.map((comment) => (
            <CommentBlock
              key={comment.id}
              comment={comment}
              user={user}
              isAdmin={isAdmin}
              onReply={(id) => { setReplyTo(id); setReplyContent(""); setReplyError("") }}
              onDelete={handleDelete}
              replyTo={replyTo}
              replyContent={replyContent}
              replySubmitting={replySubmitting}
              onReplyContentChange={setReplyContent}
              onReplySubmit={handleReply}
              onCancelReply={() => { setReplyTo(null); setReplyContent(""); setReplyError("") }}
              deleting={deleting}
            />
          ))}
        </div>
      )}
    </div>
  )
}
