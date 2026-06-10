import { prisma } from "@/lib/prisma"

const projects = [
  {
    title: "Weird Teams",
    description:
      "Team management platform combining task management, knowledge base, and OKR tracking into one workspace. No noise, just ship.",
    url: "https://teams.weirdsoft.co.uk",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    order: 0,
  },
  {
    title: "Custom Commands",
    description:
      "A powerful Discord bot for creating custom slash commands. Used by 1.2M+ members across thousands of servers with 99.9% uptime.",
    url: "https://makeown.cc",
    tags: ["TypeScript", "PostgreSQL", "Discord", "Redis"],
    order: 1,
  },
  {
    title: "Covert Ice Alliance",
    description:
      "Invite-only hockey league platform fostering sportsmanship and accountability. Features scheduling, team tracking, and merchandise.",
    url: "https://coverticealliance.com",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    order: 2,
  },
]

const posts = [
  {
    title: "Building Scalable APIs with Next.js and tRPC",
    slug: "building-scalable-apis-with-nextjs-and-trpc",
    content: `## Why tRPC?

tRPC gives you end-to-end type safety without the overhead of REST or GraphQL. No code generation, no schema definition language — just TypeScript.

## Getting Started

First, install the tRPC packages:

\`\`\`bash
bun add @trpc/server @trpc/client @trpc/react-query @tanstack/react-query
\`\`\`

Then define your router with input validation using Zod.

## Type Safety End to End

The magic of tRPC is that your API types flow directly to your frontend. Change a procedure's return type and the frontend instantly knows.

## Conclusion

tRPC is the simplest way to build type-safe APIs with Next.js. Combined with Prisma for the database layer, you get a full-stack experience that's hard to beat.`,
    excerpt: "Learn how to build type-safe APIs with tRPC and Next.js. End-to-end type safety without the complexity of GraphQL.",
    tags: ["Next.js", "TypeScript", "tRPC", "API"],
    published: true,
  },
  {
    title: "Optimizing React Performance with the Compiler",
    slug: "optimizing-react-performance-with-compiler",
    content: `## The React Compiler

The React Compiler (formerly "React Forget") automatically memoizes your components and hooks. No more useMemo, useCallback, or React.memo by hand.

## How It Works

The compiler analyzes your code at build time and inserts memoization where needed. It understands React's rules and can safely determine when values need to stay stable.

## Migration Strategy

Start by enabling the compiler in next.config.ts:

\`\`\`typescript
const nextConfig = {
  reactCompiler: true,
}
\`\`\`

Then gradually test your components. Most will work out of the box.

## Benchmarks

In production, the React Compiler reduced re-renders by 40-60% without any manual optimization.`,
    excerpt: "The React Compiler automatically memoizes your components. Here's how to enable it and what performance gains to expect.",
    tags: ["React", "Next.js", "Performance"],
    published: true,
  },
]

async function main() {
  await prisma.project.deleteMany()
  await prisma.project.createMany({ data: projects })

  await prisma.post.deleteMany()
  for (const post of posts) {
    await prisma.post.create({ data: post })
  }

  console.log("Seeded 3 projects and 2 blog posts")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
