export interface Experience {
  company: string
  address: string
  role: string
  startDate: string
  endDate: string | null
  responsibilities: string[]
}

export interface Course {
  name: string
  institution: string
  type: string
  startDate: string
  endDate: string
}

export interface Project {
  name: string
  description: string
  liveUrl?: string
  repoUrl?: string
}

export interface ResumeData {
  name: string
  phone: string
  email: string
  title: string
  website: string
  skills: string[]
  languages: string[]
  technologies: string[]
  projects: Project[]
  experience: Experience[]
  courses: Course[]
}

export const resumeData: ResumeData = {
  name: "MD SHAHRIYAR ALAM",
  phone: "+880 1718678146",
  email: "mdshahriyaralam9@gmail.com",
  title: "Web Developer",
  website: "shahriyar.dev",
  skills: [
    "ReactJS", "NextJS", "Three.js", "Redux", "ExpressJS", "Node",
    "PostgreSQL", "MongoDB", "Prisma", "TailwindCSS", "Bootstrap",
    "SCSS", "ES6", "WebSockets", "Socket.io",
  ],
  languages: ["JavaScript", "TypeScript", "Python", "C (Basic)", "C++ (Basic)"],
  technologies: [
    "GitHub", "MongoDB", "Prisma", "Linux", "REST API", "Docker",
    "NGINX", "Cloud Computing", "Vercel", "Netlify", "Firebase",
    "Stripe", "Figma",
  ],
  projects: [
    {
      name: "Slash Commands",
      description:
        "Create slash commands for your Discord server using a dashboard UI. Highly customizable commands with built-in functions, high-level programming support using Python, multi-server management, and premium features through Stripe.",
      liveUrl: "https://shahriyar.dev",
    },
    {
      name: "Portfolio Builder",
      description:
        "Users can register and create their own professional portfolio. Anyone can view shared portfolios through a public link. Users can add projects, skills, experience, and contact information. Fully responsive across all devices.",
      liveUrl: "https://shahriyar.dev",
      repoUrl: "https://github.com/shahriyardx",
    },
    {
      name: "Phorum",
      description:
        "A community discussion platform where users can create and reply to topics. AI moderation automatically checks for profanity on threads and replies. Real-time updates using Socket.io.",
      liveUrl: "https://shahriyar.dev",
      repoUrl: "https://github.com/shahriyardx",
    },
  ],
  experience: [
    {
      company: "Programming Hero",
      address: "Level-4, 34, Awal Centre, Banani, Dhaka, Bangladesh",
      role: "Web Instructor",
      startDate: "August 2023",
      endDate: null,
      responsibilities: [
        "Provide feedback and guidance to students on their coursework",
        "Answer questions and provide support through the course Facebook group",
        "Assist with the development of new courses and course materials",
        "Collaborate with other instructors to ensure consistency in course content and delivery",
        "Stay up-to-date with industry trends and technologies related to web development and the MERN stack",
      ],
    },
    {
      company: "Onito Technologies Pvt. Ltd",
      address: "123/355, Fazalganj, Darshan Purwa, Kanpur, Uttar Pradesh, India",
      role: "React Developer",
      startDate: "July 2022",
      endDate: "August 2022",
      responsibilities: [
        "Adding new UI elements and React components, and integrating them with the application",
        "Understand client's requirements and improving user experience",
        "Working with good knowledge of JavaScript",
        "Work with ReactJS (hooks, lifecycle, class and functional components)",
        "Handling the backend API data in ReactJS",
        "Maintaining code re-usability, optimization, and high quality",
        "Creating and maintaining technical documentation",
      ],
    },
    {
      company: "Crisis Entertainment",
      address: "Sydney, Australia",
      role: "Web Developer",
      startDate: "April 2022",
      endDate: "June 2022",
      responsibilities: [
        "Developing and maintaining the official website",
        "Writing clean and maintainable code",
        "Using React and Next.js to build desktop and mobile friendly experiences",
        "Making the website dynamic by providing a back-end for games and posts database integration",
      ],
    },
  ],
  courses: [
    {
      name: "Complete React Developer (w/ Redux, Hooks, GraphQL)",
      institution: "Zero To Mastery",
      type: "Online",
      startDate: "Oct 2020",
      endDate: "Dec 2020",
    },
    {
      name: "Complete Web Development Course",
      institution: "Programming Hero",
      type: "Online",
      startDate: "Jan 2022",
      endDate: "Jul 2022",
    },
    {
      name: "MERN Stack Development",
      institution: "E-Learning and Earning Institute",
      type: "Offline",
      startDate: "Oct 2022",
      endDate: "Dec 2022",
    },
    {
      name: "Three.js Journey",
      institution: "Bruno Simon",
      type: "Online",
      startDate: "Oct 2022",
      endDate: "Nov 2022",
    },
  ],
}
