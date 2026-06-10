"use client"

import { trpc } from "@/lib/trpc/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Envelope } from "@phosphor-icons/react"

export default function MessagesPage() {
  const utils = trpc.useUtils()
  const { data: messages = [] } = trpc.contact.list.useQuery()
  const markRead = trpc.contact.markRead.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  })

  const unread = messages.filter((m) => !m.read)
  const read = messages.filter((m) => m.read)

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions.
        </p>
      </div>

      {messages.length === 0 && (
        <div className="flex flex-col items-center gap-4 border border-dashed p-12 text-center">
          <div className="flex size-12 items-center justify-center border bg-muted/30 text-muted-foreground">
            <Envelope size={24} />
          </div>
          <p className="font-medium">No messages yet</p>
        </div>
      )}

      {unread.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Unread ({unread.length})
          </h2>
          {unread.map((msg) => (
            <MessageCard key={msg.id} message={msg} onRead={() => markRead.mutate({ id: msg.id })} />
          ))}
        </div>
      )}

      {read.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Read ({read.length})
          </h2>
          {read.map((msg) => (
            <MessageCard key={msg.id} message={msg} />
          ))}
        </div>
      )}
    </div>
  )
}

function MessageCard({ message, onRead }: { message: { id: string; name: string; email: string; message: string; read: boolean; createdAt: string }; onRead?: () => void }) {
  return (
    <div className="border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{message.name}</span>
            {!message.read && <Badge variant="default" className="text-xs">New</Badge>}
          </div>
          <a href={`mailto:${message.email}`} className="text-sm text-muted-foreground hover:text-foreground">
            {message.email}
          </a>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
            })}
          </span>
          {!message.read && onRead && (
            <Button variant="ghost" size="sm" onClick={onRead}>
              Mark read
            </Button>
          )}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{message.message}</p>
    </div>
  )
}
