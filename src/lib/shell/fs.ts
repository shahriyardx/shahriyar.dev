/**
 * A tiny read-only filesystem for the hero shell.
 *
 * Built on the server from the same data the pages render, then handed to the
 * client as plain JSON — so `cat posts/foo.md` shows the real excerpt, and a
 * new app or post appears in the shell without anyone touching this file.
 */

export interface FsFile {
  kind: "file"
  content: string
  /** Set when the file has a page behind it — `open` navigates there. */
  href?: string
}

export interface FsDir {
  kind: "dir"
  children: Record<string, FsNode>
  href?: string
}

export type FsNode = FsFile | FsDir

export const HOME = "/home/shahriyar"

const file = (content: string, href?: string): FsFile => ({
  kind: "file",
  content: content.trim(),
  href,
})

const dir = (children: Record<string, FsNode>, href?: string): FsDir => ({
  kind: "dir",
  children,
  href,
})

export interface FsInput {
  apps: {
    slug: string
    name: string
    tagline: string
    description: string
    platforms: string[]
    repo: string
  }[]
  posts: {
    slug: string
    title: string
    excerpt: string | null
    tags: string[]
  }[]
  projects: {
    title: string
    description: string
    url: string
    tags: string[]
  }[]
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const stack: Record<string, string> = {
  "languages.txt": "typescript\njavascript\npython\nrust",
  "frontend.txt":
    "react\nnext.js\ntailwind\nshadcn/ui\ntanstack-query\nframer-motion",
  "backend.txt": "node\nexpress\ntrpc\nfastapi\ndjango",
  "databases.txt": "postgresql\nmongodb\nmysql\nprisma\ndrizzle",
  "mobile.txt": "react-native\nexpo",
  "tools.txt": "docker\nlinux\ngit\nfirebase\nstripe",
}

export function buildFs(input: FsInput): FsDir {
  const appDirs: Record<string, FsNode> = {}
  for (const app of input.apps) {
    appDirs[app.slug] = dir(
      {
        "README.md": file(
          `# ${app.name}\n\n${app.tagline}\n\n${app.description}\n\nplatforms: ${app.platforms.join(", ")}\nrepo: ${app.repo}`,
          `/apps/${app.slug}`,
        ),
      },
      `/apps/${app.slug}`,
    )
  }

  const postFiles: Record<string, FsNode> = {}
  for (const post of input.posts) {
    const title = post.title.replace(/^["'“”]+|["'“”]+$/g, "").trim()
    postFiles[`${post.slug}.md`] = file(
      `# ${title}\n\n${post.excerpt ?? "(no excerpt)"}\n\ntags: ${post.tags.map((t) => `#${t}`).join(" ") || "—"}`,
      `/blog/${post.slug}`,
    )
  }

  const projectDirs: Record<string, FsNode> = {}
  for (const project of input.projects) {
    const slug = slugify(project.title)
    projectDirs[slug] = dir({
      "README.md": file(
        `# ${project.title}\n\n${project.description}\n\ntags: ${project.tags.join(", ") || "—"}\nurl: ${project.url}`,
        project.url,
      ),
    })
  }

  const stackFiles: Record<string, FsNode> = {}
  for (const [name, content] of Object.entries(stack)) {
    stackFiles[name] = file(content)
  }

  return dir({
    home: dir({
      shahriyar: dir({
        "about.txt": file(
          "Md Shahriyar Alam — full-stack developer.\n\nI craft performant, accessible digital experiences with modern web\ntechnologies, and ship small tools that stay out of your way.\n\nMostly TypeScript and React, some Python and Rust. Arch Linux, Zed, zsh.",
          "/about",
        ),
        "resume.md": file(
          "# Resume\n\nWeb developer — React, Next.js, Node, and modern web technologies.\nRun `open resume.md` for the full version.",
          "/resume",
        ),
        "contact.txt": file(
          "email:    hello@shahriyar.dev\ngithub:   github.com/shahriyardx\nlinkedin: linkedin.com/in/devshahriyar\nx:        x.com/shahriyardx\n\nRun `open contact.txt` to send a message.",
          "/contact",
        ),
        apps: dir(appDirs, "/apps"),
        posts: dir(postFiles, "/blog"),
        projects: dir(projectDirs, "/projects"),
        stack: dir(stackFiles),
        ".secret": file(
          "You went looking. Respect.\n\nThere's no easter egg here, but there is a `sudo` command.",
        ),
      }),
    }),
  })
}

/** Resolve `input` against `cwd` into a normalised absolute path. */
export function resolvePath(cwd: string, input: string): string {
  if (!input || input === "~") return HOME
  let path = input
  if (path.startsWith("~/")) path = HOME + path.slice(1)
  const absolute = path.startsWith("/") ? path : `${cwd}/${path}`

  const parts: string[] = []
  for (const part of absolute.split("/")) {
    if (!part || part === ".") continue
    if (part === "..") parts.pop()
    else parts.push(part)
  }
  return `/${parts.join("/")}`
}

export function getNode(root: FsDir, path: string): FsNode | null {
  if (path === "/") return root
  let node: FsNode = root
  for (const part of path.split("/").filter(Boolean)) {
    if (node.kind !== "dir") return null
    const next: FsNode | undefined = node.children[part]
    if (!next) return null
    node = next
  }
  return node
}

/** `/home/shahriyar/apps` -> `~/apps` */
export function prettyPath(path: string): string {
  return path === HOME
    ? "~"
    : path.startsWith(`${HOME}/`)
      ? `~${path.slice(HOME.length)}`
      : path
}
