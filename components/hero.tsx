'use client'

import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RotatingCubeText } from '@/components/rotating-cube-text'

export function Hero() {
  const [showBvar, setShowBvar] = useState(false)
  const [showRest, setShowRest] = useState(false)
  const [showFullName, setShowFullName] = useState(false)
  const [nameRevealProgress, setNameRevealProgress] = useState(0)
  const nameRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Fade in "b var"
    const bvarTimer = setTimeout(() => setShowBvar(true), 400)
    // Fade in rest of hero
    const restTimer = setTimeout(() => setShowRest(true), 1400)
    // Enable full name reveal after rest is visible
    const nameTimer = setTimeout(() => setShowFullName(true), 1800)
    return () => {
      clearTimeout(bvarTimer)
      clearTimeout(restTimer)
      clearTimeout(nameTimer)
    }
  }, [])

  // Mouse reveal for full name
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!nameRef.current) return
    const rect = nameRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 320
    const minDistance = 80
    let progress = 0
    if (distance <= minDistance) {
      progress = 1
    } else if (distance <= maxDistance) {
      progress = 1 - (distance - minDistance) / (maxDistance - minDistance)
    }
    progress = Math.max(0, Math.min(1, progress))
    setNameRevealProgress(progress)
  }

  const handleMouseLeave = () => {
    setNameRevealProgress(0)
  }

  // Reveal logic for the name
  const getRevealedText = () => {
    const fullName = 'baylor van note'
    const shortName = 'b var'
    if (!showFullName) {
      return shortName
    }
    const revealLength = Math.floor(nameRevealProgress * fullName.length)
    if (revealLength === 0) return shortName
    const revealedPart = fullName.substring(0, revealLength)
    const remainingShort = shortName.substring(revealLength)
    return (
      revealedPart +
      remainingShort.substring(0, Math.max(0, shortName.length - revealLength))
    )
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] transition-colors duration-500" />

      {/* Hidden letter V for VARIABLE */}
      <div className="absolute bottom-42 left-16 text-2xl font-medium hidden-text pointer-events-none select-none">
        V
      </div>
      {/* Only the A gets the special class */}
      <div className="absolute top-1 left-556 text-2xl font-medium hidden-text pointer-events-none select-none hero-sercret-a">
        A
      </div>

      <div
        className="container mx-auto px-4 text-center relative z-10"
        onMouseMove={showFullName ? handleMouseMove : undefined}
        onMouseLeave={showFullName ? handleMouseLeave : undefined}
      >
        {/* "b var" appears first, then full name becomes interactive */}
        <div
          className={`transition-opacity duration-1000 ease-out ${
            showBvar ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-10 mt-10">
            <span
              ref={nameRef}
              className="text-foreground hero-name-glow relative inline-block cursor-pointer"
            >
              <span className="transition-all duration-200 ease-out">
                {getRevealedText()
                  .split('')
                  .map((char, index) => {
                    const fullName = 'baylor van note'
                    const isRevealed =
                      showFullName &&
                      index < Math.floor(nameRevealProgress * fullName.length)
                    const opacity = isRevealed || !showFullName ? 1 : 0.7
                    const scale = isRevealed || !showFullName ? 1 : 0.95
                    return (
                      <span
                        key={index}
                        className="inline-block transition-all duration-300 ease-out"
                        style={{
                          opacity,
                          transform: `scale(${scale})`,
                          color: isRevealed
                            ? 'inherit'
                            : 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    )
                  })}
              </span>
            </span>
          </h1>
        </div>

        {/* Everything else fades in after b var */}
        <div
          className={`transition-opacity duration-1000 ease-out ${
            showRest ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto transition-colors duration-500 hero-text-glow">
            <RotatingCubeText />
          </div>

          <p className="text-lg md:text-2xl mb-16 max-w-2xl mx-auto transition-colors duration-500 hero-description-glow">
            I create softwares, websites, and applications centered around the
            experience. My passion lies in crafting unique solutions that leave
            a lasting impression.
          </p>

          <div className="flex justify-center space-x-10 mb-16">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="reveal-proxy hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/25"
            >
              <a
                href="https://github.com/GamesFall"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-8 w-8" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="reveal-proxy hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/25"
            >
              <a
                href="https://www.linkedin.com/in/baylor-van-note/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-8 w-8" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="reveal-proxy hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/25"
            >
              <a href="mailto:baylor.van.note@gmail.com" aria-label="Email">
                <Mail className="h-8 w-8" />
              </a>
            </Button>
          </div>

          <Button
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden group"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-all duration-500 ${
          showRest ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        <ChevronDown className="h-10 w-10 text-muted-foreground" />
      </button>
    </section>
  )
}
