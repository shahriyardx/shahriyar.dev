export interface Experience {
  company: string
  role: string
  location: string
  startDate: string
  endDate: string | null
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Skill {
  category: string
  items: string[]
}

export interface ResumeData {
  name: string
  title: string
  email: string
  website: string
  location: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

export const resumeData: ResumeData = {
  name: "Shahriyar",
  title: "Full-Stack Developer",
  email: "hello@shahriyar.dev",
  website: "shahriyar.dev",
  location: "Remote",
  summary:
    "Full-stack developer focused on building modern web applications with React, Next.js, and TypeScript. Passionate about clean architecture, type safety, and performant user experiences.",
  experience: [
    {
      company: "Freelance",
      role: "Full-Stack Developer",
      location: "Remote",
      startDate: "2022",
      endDate: null,
      highlights: [
        "Built full-stack web applications using Next.js, TypeScript, and PostgreSQL",
        "Designed and implemented RESTful and tRPC APIs with Prisma ORM",
        "Deployed and managed applications on Linux servers with Docker",
        "Integrated authentication, payment processing, and third-party APIs",
      ],
    },
  ],
  education: [
    {
      institution: "University",
      degree: "Bachelor's",
      field: "Computer Science",
      startDate: "2018",
      endDate: "2022",
    },
  ],
  skills: [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "tRPC", "REST APIs", "WebSocket"] },
    { category: "Database", items: ["PostgreSQL", "Prisma", "GraphQL"] },
    { category: "DevOps", items: ["Docker", "Linux", "CI/CD", "Vercel"] },
    { category: "Tools", items: ["Git", "Biome", "VS Code"] },
  ],
}
