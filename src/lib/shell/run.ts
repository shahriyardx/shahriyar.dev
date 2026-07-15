/**
 * The shell itself: parse a line, walk the virtual filesystem, print output.
 *
 * Supports `&&` chaining and a couple of pipe sinks (`head`, `wc -l`) — enough
 * that muscle memory works, without pretending to be bash.
 */
import {
  type FsDir,
  type FsNode,
  getNode,
  HOME,
  prettyPath,
  resolvePath,
} from "./fs"

export type LineKind = "input" | "output" | "muted" | "error" | "accent"

export interface Line {
  kind: LineKind
  text: string
}

export interface RunResult {
  lines: Line[]
  /** Set when the command changed directory. */
  cwd?: string
  /** Set when the command should navigate the browser. */
  navigate?: string
  /** Set by `clear`. */
  clear?: boolean
}

const out = (text: string): Line => ({ kind: "output", text })
const err = (text: string): Line => ({ kind: "error", text })
const muted = (text: string): Line => ({ kind: "muted", text })

export const COMMANDS = [
  "help",
  "ls",
  "cd",
  "pwd",
  "cat",
  "tree",
  "grep",
  "find",
  "open",
  "whoami",
  "neofetch",
  "echo",
  "history",
  "clear",
  "uname",
  "date",
  "sudo",
  "exit",
] as const

const HELP: Line[] = [
  muted("FILESYSTEM"),
  out("  ls [-l] [path]     list a directory"),
  out("  cd <path>          change directory (.. and ~ work)"),
  out("  pwd                print working directory"),
  out("  cat <file>         print a file"),
  out("  tree [path]        print the tree"),
  out("  find <name>        find by name"),
  out('  grep [-i] "x" .    search file contents'),
  muted("SITE"),
  out("  open [path]        open the real page for a file/dir"),
  out("  neofetch           the specs"),
  out("  whoami             short version"),
  muted("SHELL"),
  out("  echo, history, date, uname, clear, exit"),
  out("  pipes: | head [-n N] · | wc -l    chaining: &&"),
  muted("Tab completes. ↑/↓ walks history."),
]

/** Split on top-level spaces, honouring quotes. */
function tokenize(input: string): string[] {
  const tokens: string[] = []
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g
  let m: RegExpExecArray | null
  m = re.exec(input)
  while (m !== null) {
    tokens.push(m[1] ?? m[2] ?? m[3])
    m = re.exec(input)
  }
  return tokens
}

function listDir(
  node: FsDir,
  long: boolean,
  all: boolean,
  onePerLine: boolean,
): Line[] {
  const names = Object.keys(node.children)
    .filter((n) => all || !n.startsWith("."))
    .sort()

  if (!names.length) return []

  const label = (n: string) => (node.children[n].kind === "dir" ? `${n}/` : n)

  if (!long) {
    // Real ls drops to one entry per line when it isn't writing to a tty.
    return onePerLine
      ? names.map((n) => out(label(n)))
      : [out(names.map(label).join("  "))]
  }

  return names.map((n) => {
    const child = node.children[n]
    const isDir = child.kind === "dir"
    const size = isDir
      ? Object.keys(child.children).length
      : child.content.length
    const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--"
    return out(`${perms}  ${String(size).padStart(5)}  ${isDir ? `${n}/` : n}`)
  })
}

function treeLines(node: FsNode, prefix: string, name: string): Line[] {
  if (node.kind === "file") return [out(`${prefix}${name}`)]
  const lines = [out(`${prefix}${name}/`)]
  const names = Object.keys(node.children)
    .filter((n) => !n.startsWith("."))
    .sort()
  names.forEach((child, i) => {
    const last = i === names.length - 1
    const branch = last ? "└── " : "├── "
    const nextPrefix = prefix.replace(/[├└]── /, last ? "    " : "│   ")
    const sub = treeLines(node.children[child], `${nextPrefix}${branch}`, child)
    lines.push(...sub)
  })
  return lines
}

function walk(
  node: FsNode,
  path: string,
  fn: (filePath: string, content: string) => void,
): void {
  if (node.kind === "file") {
    fn(path, node.content)
    return
  }
  for (const [name, child] of Object.entries(node.children)) {
    if (name.startsWith(".")) continue
    walk(child, `${path}/${name}`, fn)
  }
}

/** Apply a pipe sink to already-produced lines. */
function pipe(lines: Line[], stage: string): Line[] {
  const tokens = tokenize(stage)
  const cmd = tokens[0]

  if (cmd === "head") {
    const n = Number(tokens[tokens.indexOf("-n") + 1]) || 10
    return lines.slice(0, n)
  }
  if (cmd === "wc") {
    return [out(String(lines.length))]
  }
  if (cmd === "grep") {
    const needle = tokens[1]?.toLowerCase() ?? ""
    return lines.filter((l) => l.text.toLowerCase().includes(needle))
  }
  return [err(`unsupported pipe: ${cmd}`)]
}

function runSingle(
  input: string,
  root: FsDir,
  cwd: string,
  piped: boolean,
): RunResult {
  const tokens = tokenize(input)
  if (!tokens.length) return { lines: [] }

  const [cmd, ...args] = tokens
  const flags = args.filter((a) => a.startsWith("-"))
  const rest = args.filter((a) => !a.startsWith("-"))
  const has = (f: string) => flags.some((flag) => flag.includes(f.slice(1)))

  switch (cmd) {
    case "help":
      return { lines: HELP }

    case "pwd":
      return { lines: [out(cwd)] }

    case "whoami":
      return { lines: [out("Md Shahriyar Alam — full-stack developer")] }

    case "uname":
      return { lines: [out("shahriyar.dev 1.0.0 (next.js; react) x86_64")] }

    case "date":
      return { lines: [out(new Date().toString())] }

    case "echo":
      return { lines: [out(rest.join(" "))] }

    case "clear":
      return { lines: [], clear: true }

    case "exit":
      return {
        lines: [muted("There's no exiting a website. Try `open about.txt`.")],
      }

    case "sudo":
      return {
        lines: [
          err("shahriyar is not in the sudoers file."),
          muted("This incident will be reported."),
        ],
      }

    case "ls": {
      const path = resolvePath(cwd, rest[0] ?? ".")
      const node = getNode(root, path)
      if (!node)
        return { lines: [err(`ls: ${rest[0]}: No such file or directory`)] }
      if (node.kind === "file") return { lines: [out(rest[0] ?? path)] }
      return { lines: listDir(node, has("-l"), has("-a"), piped) }
    }

    case "cd": {
      const target = rest[0] ?? "~"
      const path = resolvePath(cwd, target)
      const node = getNode(root, path)
      if (!node)
        return { lines: [err(`cd: no such file or directory: ${target}`)] }
      if (node.kind !== "dir")
        return { lines: [err(`cd: not a directory: ${target}`)] }
      return { lines: [], cwd: path }
    }

    case "cat": {
      if (!rest.length) return { lines: [err("cat: missing operand")] }
      const lines: Line[] = []
      for (const arg of rest) {
        const node = getNode(root, resolvePath(cwd, arg))
        if (!node) lines.push(err(`cat: ${arg}: No such file or directory`))
        else if (node.kind === "dir")
          lines.push(err(`cat: ${arg}: Is a directory`))
        else lines.push(...node.content.split("\n").map(out))
      }
      return { lines }
    }

    case "tree": {
      const path = resolvePath(cwd, rest[0] ?? ".")
      const node = getNode(root, path)
      if (!node)
        return { lines: [err(`tree: ${rest[0]}: No such file or directory`)] }
      return { lines: treeLines(node, "", prettyPath(path)) }
    }

    case "find": {
      const needle = (rest[0] ?? "").toLowerCase()
      if (!needle) return { lines: [err("find: missing name")] }
      const hits: Line[] = []
      walk(getNode(root, cwd) ?? root, prettyPath(cwd), (p) => {
        if (p.toLowerCase().includes(needle)) hits.push(out(p))
      })
      return { lines: hits.length ? hits : [muted("no matches")] }
    }

    case "grep": {
      const needle = rest[0]?.toLowerCase()
      if (!needle) return { lines: [err("grep: missing pattern")] }
      const scope = resolvePath(cwd, rest[1] ?? ".")
      const node = getNode(root, scope)
      if (!node)
        return { lines: [err(`grep: ${rest[1]}: No such file or directory`)] }

      const hits: Line[] = []
      walk(node, prettyPath(scope), (p, content) => {
        for (const line of content.split("\n")) {
          if (line.toLowerCase().includes(needle)) {
            hits.push(out(`${p}: ${line.trim()}`))
          }
        }
      })
      return { lines: hits.length ? hits : [muted("no matches")] }
    }

    case "open": {
      const path = resolvePath(cwd, rest[0] ?? ".")
      const node = getNode(root, path)
      if (!node)
        return { lines: [err(`open: ${rest[0]}: No such file or directory`)] }
      if (!node.href) {
        return { lines: [muted(`open: nothing to open for ${rest[0] ?? "."}`)] }
      }
      return {
        lines: [{ kind: "accent", text: `opening ${node.href} …` }],
        navigate: node.href,
      }
    }

    case "neofetch":
      return {
        lines: [
          out("shahriyar@dev"),
          muted("—————————————"),
          out("role    Full-stack developer"),
          out("uptime  5+ years building"),
          out("os      Arch Linux (Hyprland)"),
          out("editor  Zed"),
          out("shell   zsh + Oh My Zsh"),
          out("cpu     Ryzen 7 7700"),
          out("gpu     Intel Arc A380"),
          out("stack   Next.js · TypeScript · Tailwind · Postgres"),
        ],
      }

    default:
      return {
        lines: [err(`zsh: command not found: ${cmd}`), muted("Try `help`.")],
      }
  }
}

export function run(input: string, root: FsDir, cwd: string): RunResult {
  const trimmed = input.trim()
  if (!trimmed) return { lines: [] }

  // `history` is answered by the UI, which owns the list.
  let workingCwd = cwd
  const collected: Line[] = []
  let navigate: string | undefined
  let clear = false

  for (const segment of trimmed.split("&&")) {
    const stages = segment.split("|").map((s) => s.trim())
    const result = runSingle(stages[0], root, workingCwd, stages.length > 1)

    let lines = result.lines
    for (const stage of stages.slice(1)) {
      lines = pipe(lines, stage)
    }

    collected.push(...lines)
    if (result.cwd) workingCwd = result.cwd
    if (result.navigate) navigate = result.navigate
    if (result.clear) clear = true
  }

  return {
    lines: collected,
    cwd: workingCwd === cwd ? undefined : workingCwd,
    navigate,
    clear,
  }
}

/** Tab completion: commands at the start, paths after. */
export function complete(
  input: string,
  root: FsDir,
  cwd: string,
): string | null {
  const tokens = input.split(" ")
  const last = tokens[tokens.length - 1]

  if (tokens.length === 1) {
    const match = COMMANDS.find((c) => c.startsWith(last))
    return match ?? null
  }

  const slash = last.lastIndexOf("/")
  const dirPart = slash >= 0 ? last.slice(0, slash) : ""
  const filePart = slash >= 0 ? last.slice(slash + 1) : last

  const node = getNode(root, resolvePath(cwd, dirPart || "."))
  if (node?.kind !== "dir") return null

  const match = Object.keys(node.children)
    .filter((n) => !n.startsWith("."))
    .sort()
    .find((n) => n.startsWith(filePart))
  if (!match) return null

  const completed = dirPart ? `${dirPart}/${match}` : match
  const suffix = node.children[match].kind === "dir" ? "/" : ""
  return [...tokens.slice(0, -1), completed + suffix].join(" ")
}

export { HOME }
