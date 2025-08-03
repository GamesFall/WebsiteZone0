"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    setIsTransitioning(true)

    // Create transition overlay
    const overlay = document.createElement("div")
    overlay.className = "theme-transition-overlay"
    document.body.appendChild(overlay)

    // Change theme after a short delay
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light")
    }, 100)

    // Remove overlay after animation
    setTimeout(() => {
      document.body.removeChild(overlay)
      setIsTransitioning(false)
    }, 800)
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeToggle}
      disabled={isTransitioning}
      className="relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
