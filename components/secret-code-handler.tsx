"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SecretCodeHandlerProps {
  secretCode: string
  onCodeAccepted: () => void
}

export function SecretCodeHandler({ secretCode, onCodeAccepted }: SecretCodeHandlerProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [discoveredWords, setDiscoveredWords] = useState<Set<string>>(new Set())

  // Hidden words that spell out "VARIABLE"
  const hiddenWords = [
    "v", // Hero
    "a", // Hero
    "r", // About
    "i", // About
    "a", // About
    "b", // Projects
    "l", // Projects
    "e", // Projects
  ]

  const correctCode = "variable" // The secret code to unlock the fireworks

  // Track discovered words by monitoring light reveals
  useEffect(() => {
    const checkDiscoveredWords = () => {
      const revealedElements = document.querySelectorAll(".hidden-text.light-reveal-active")
      const newDiscovered = new Set(discoveredWords)

      revealedElements.forEach((element) => {
        const text = element.textContent?.toLowerCase()
        if (text && hiddenWords.includes(text)) {
          newDiscovered.add(text)
        }
      })

      if (newDiscovered.size !== discoveredWords.size) {
        setDiscoveredWords(newDiscovered)
      }
    }

    const interval = setInterval(checkDiscoveredWords, 500)
    return () => clearInterval(interval)
  }, [discoveredWords])

  // Check for correct code
  useEffect(() => {
    if (secretCode.toLowerCase() === correctCode) {
      setShowSuccess(true)
      onCodeAccepted()

      // Launch fireworks
      launchFireworks()
    }
  }, [secretCode, onCodeAccepted])

  const launchFireworks = () => {
    // Launch multiple fireworks with staggered timing
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        createFirework()
      }, i * 800)
    }
  }

  const createFirework = () => {
    // Random position for firework launch
    const startX = Math.random() * window.innerWidth
    const startY = window.innerHeight
    const endX = startX + (Math.random() - 0.5) * 200
    const endY = Math.random() * (window.innerHeight * 0.6) + 100

    // Create rocket trail
    const rocket = document.createElement("div")
    rocket.className = "firework-rocket"
    rocket.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: 4px;
      height: 20px;
      background: linear-gradient(to top, #ffff00, #ff6600);
      border-radius: 2px;
      pointer-events: none;
      z-index: 10000;
      transform-origin: center bottom;
    `

    document.body.appendChild(rocket)

    // Animate rocket to explosion point
    rocket.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${Math.random() * 20 - 10}deg)`,
          opacity: 0.8,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    ).onfinish = () => {
      // Remove rocket and create explosion
      document.body.removeChild(rocket)
      createExplosion(endX, endY)
    }
  }

  const createExplosion = (x: number, y: number) => {
    const colors = [
      "#ff0080",
      "#ff4000",
      "#ff8000",
      "#ffff00",
      "#80ff00",
      "#00ff80",
      "#00ffff",
      "#0080ff",
      "#8000ff",
      "#ff00ff",
    ]

    const particleCount = 30 + Math.random() * 20

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      const color = colors[Math.floor(Math.random() * colors.length)]
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5
      const velocity = 100 + Math.random() * 150
      const size = 3 + Math.random() * 5

      particle.className = "firework-particle"
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 6px ${color}, 0 0 12px ${color};
      `

      document.body.appendChild(particle)

      // Calculate end position
      const endX = x + Math.cos(angle) * velocity
      const endY = y + Math.sin(angle) * velocity + Math.random() * 100

      // Animate particle
      particle.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
            filter: "brightness(1.5)",
          },
          {
            transform: `translate(${endX - x}px, ${endY - y}px) scale(0.3)`,
            opacity: 0,
            filter: "brightness(0.5)",
          },
        ],
        {
          duration: 1500 + Math.random() * 1000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      ).onfinish = () => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
      }

      // Add sparkle effect
      if (Math.random() < 0.3) {
        setTimeout(
          () => {
            createSparkle(endX, endY, color)
          },
          800 + Math.random() * 500,
        )
      }
    }
  }

  const createSparkle = (x: number, y: number, color: string) => {
    const sparkle = document.createElement("div")
    sparkle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 2px;
      height: 2px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      box-shadow: 0 0 4px ${color};
    `

    document.body.appendChild(sparkle)

    sparkle.animate(
      [
        { opacity: 0, transform: "scale(0)" },
        { opacity: 1, transform: "scale(1.5)" },
        { opacity: 0, transform: "scale(0)" },
      ],
      {
        duration: 600,
        easing: "ease-in-out",
      },
    ).onfinish = () => {
      if (document.body.contains(sparkle)) {
        document.body.removeChild(sparkle)
      }
    }
  }

  const progressPercentage = Math.round((discoveredWords.size / hiddenWords.length) * 100)
  const foundLetters = Array.from(discoveredWords).sort()

  return (
    <>
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              <span className="firework-text">🎆 FIREWORKS! 🎆</span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg">You've unlocked the secret fireworks show!</p>
            <p className="text-muted-foreground">
              You discovered {discoveredWords.size} out of {hiddenWords.length} letters ({progressPercentage}%)
            </p>
            <div className="text-2xl font-mono font-bold tracking-wider">{foundLetters.join(" ").toUpperCase()}</div>
            <p className="text-sm text-muted-foreground">Letters found: {foundLetters.join(", ").toUpperCase()}</p>
            <div className="firework-text text-sm font-medium">Enjoy the fireworks show!</div>
            <Button onClick={() => setShowSuccess(false)} className="firework-button">
              Amazing!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Progress indicator */}
      <div className="fixed bottom-4 right-4 text-xs text-muted-foreground/50 pointer-events-none select-none">
        {discoveredWords.size > 0 && (
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1">
            Letters: {discoveredWords.size}/{hiddenWords.length}
          </div>
        )}
      </div>
    </>
  )
}
