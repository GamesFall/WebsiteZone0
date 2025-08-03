'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { ReactiveBackground } from '@/components/reactive-background'
import { ScrollProgress } from '@/components/scroll-progress'

export default function Portfolio() {
  return (
    <div className="bg-background text-foreground relative">
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
      <ReactiveBackground />
      <ScrollProgress />
    </div>
  )
}
