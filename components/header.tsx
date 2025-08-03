'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { SecretCodeHandler } from '@/components/secret-code-handler'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [secretCode, setSecretCode] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          isScrolled
            ? 'bg-background/60 dark:bg-background/40 backdrop-blur-xl border-b border-white/10 dark:border-white/5 shadow-lg shadow-black/5 dark:shadow-black/20'
            : 'bg-background/30 dark:bg-background/20 backdrop-blur-md'
        }`}
      style={{
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5" />
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="projects-gradient">Portfolio</span>
            </div>
            {/* Secret Code Input */}
            <div className="hidden md:flex items-center">
              <Input
                type="text"
                placeholder="enter code..."
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="w-32 h-8 text-xs bg-transparent backdrop-blur-sm border-border/50 text-foreground placeholder-muted-foreground/70 focus:border-blue-500/50 secret-input-glow"
                maxLength={20}
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-muted-foreground hover:text-foreground transition-all duration-300 capitalize relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <ThemeToggle />
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="backdrop-blur-sm bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/10 dark:border-white/5 backdrop-blur-xl bg-background/20 dark:bg-background/10 rounded-lg">
            <div className="flex flex-col space-y-4 pt-4">
              <Input
                type="text"
                placeholder="enter code..."
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="w-full h-8 text-xs bg-background/30 backdrop-blur-sm border-border/50 text-foreground placeholder-muted-foreground/70 focus:border-blue-500/50 secret-input-glow"
                maxLength={20}
              />
              {['home', 'about', 'projects', 'skills', 'contact'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 capitalize text-left"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </nav>
        )}
      </div>

      <SecretCodeHandler
        secretCode={secretCode}
        onCodeAccepted={() => setSecretCode('')}
      />
    </header>
  )
}
