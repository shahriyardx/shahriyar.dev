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

async function main() {
  await prisma.project.deleteMany()
  await prisma.project.createMany({ data: projects })
  console.log("Seeded 3 projects")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
