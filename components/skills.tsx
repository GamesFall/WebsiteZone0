'use client'

import { useEffect, useState, useRef } from 'react'
import { ScrollAnimation } from '@/components/scroll-animation'

export function Skills() {
  const [animatedSkills, setAnimatedSkills] = useState<{
    [key: string]: number
  }>({})
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const skills = [
    { name: 'React/Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'C#', level: 80 },
    { name: 'Three.js', level: 75 },
    { name: 'UI/UX Design', level: 85 },
    { name: 'Marketing', level: 80 },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) {
      setAnimatedSkills({})
      return
    }

    // Animate each skill bar with staggered timing
    skills.forEach((skill, index) => {
      setTimeout(() => {
        let currentLevel = 0
        const targetLevel = skill.level
        const increment = targetLevel / 60 // 60 steps

        const animateBar = () => {
          currentLevel += increment
          if (currentLevel >= targetLevel) {
            currentLevel = targetLevel
          }

          setAnimatedSkills((prev) => ({
            ...prev,
            [skill.name]: Math.round(currentLevel),
          }))

          if (currentLevel < targetLevel) {
            requestAnimationFrame(animateBar)
          }
        }

        animateBar()
      }, index * 200)
    })
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 bg-muted/50 transition-colors duration-500 relative flex items-center justify-center overflow-hidden"
    >
      {/* Hidden text elements */}
      <div className="absolute bottom-54 left-454 text-sm font-medium hidden-text pointer-events-none select-none">
        Master
      </div>
      <div className="absolute bottom-84 left-256 text-base font-medium hidden-text pointer-events-none select-none transform rotate-6">
        Learn
      </div>
      <div className="absolute top-1/2 left-180 text-base font-medium hidden-text pointer-events-none select-none transform -rotate-45">
        Grow
      </div>

      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="projects-gradient">Skills & Technologies</span>
          </h2>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          <ScrollAnimation delay={200}>
            <div className="grid gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-3 group">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground font-semibold text-lg md:text-xl transition-colors duration-500 group-hover:text-blue-400">
                      {skill.name}
                    </span>
                    <span className="text-foreground font-bold text-lg md:text-xl">
                      {animatedSkills[skill.name] || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-5 md:h-6 overflow-hidden transition-colors duration-500">
                    <div
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-5 md:h-6 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                      style={{ width: `${animatedSkills[skill.name] || 0}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
