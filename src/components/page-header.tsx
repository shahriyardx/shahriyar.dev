import { cn } from "@/lib/utils"

/** Small uppercase label that sits above a heading. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </p>
  )
}

/**
 * Standard page masthead: label, title, and an optional line of description.
 */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1 className="text-3xl font-medium tracking-tight md:text-4xl">
        {title}
      </h1>
      {children && (
        <div className="max-w-lg text-muted-foreground">{children}</div>
      )}
    </div>
  )
}

/** Section-level variant of the masthead. */
export function SectionHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
        {title}
      </h2>
      {children && (
        <div className="max-w-lg text-muted-foreground">{children}</div>
      )}
    </div>
  )
}
