import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"
import { SkillsPreview } from "@/components/skills-preview"
import { CTASection } from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsPreview />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}
