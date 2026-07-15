import { cn } from "@/lib/utils"

/** The one place the prompt colour lives. */
export const PROMPT = "#4ADE80"

/**
 * A shell prompt line: `❯ some command`.
 * The glyph is decoration, so screen readers skip it and just read the command.
 */
export function Cmd({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)}>
      <span style={{ color: PROMPT }} aria-hidden="true">
        ❯{" "}
      </span>
      {children}
    </p>
  )
}

/** A block cursor. Decorative. */
export function Cursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-foreground/70",
        className,
      )}
    />
  )
}

/**
 * A terminal window. `title` renders the title bar with traffic lights;
 * without it you get a plain output pane.
 */
export function Pane({
  title,
  children,
  className,
  bodyClassName,
}: {
  title?: string
  children: React.ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div className={cn("overflow-hidden border bg-card", className)}>
      {title && (
        <div className="flex items-center gap-3 border-b bg-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#FF5F57]" />
            <span className="size-3 rounded-full bg-[#FEBC2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="mx-auto pr-6 text-xs text-muted-foreground">
            {title}
          </span>
        </div>
      )}
      <div className={cn("p-5 md:p-6", bodyClassName)}>{children}</div>
    </div>
  )
}

/**
 * Standard page masthead: the command that "produced" the page, the title,
 * and an optional line of description.
 */
export function PageHeader({
  cmd,
  title,
  children,
}: {
  cmd: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <Cmd>{cmd}</Cmd>
      <h1 className="text-[clamp(2rem,6vw,3.25rem)] leading-[0.95] font-black tracking-tight">
        {title}
      </h1>
      {children && (
        <div className="max-w-lg text-muted-foreground">{children}</div>
      )}
    </div>
  )
}
