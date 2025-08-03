"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const elementRef = useRef<HTMLParagraphElement>(null)

  const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const generateRandomText = (targetText: string) => {
    return targetText
      .split("")
      .map((char) => {
        if (char === " " || char === "." || char === "," || char === "!" || char === "?" || char === "'") {
          return char
        }
        return getRandomChar()
      })
      .join("")
  }

  useEffect(() => {
    // Start with random text
    setDisplayText(generateRandomText(text))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          const windowHeight = window.innerHeight

          // Calculate visibility
          const elementTop = Math.max(0, -rect.top)
          const elementBottom = Math.min(rect.height, windowHeight - rect.top)
          const visibleHeight = Math.max(0, elementBottom - elementTop)
          const progress = Math.min(1, visibleHeight / rect.height)

          // Animate text based on scroll progress
          const correctChars = Math.floor(progress * text.length)

          let newText = ""
          for (let i = 0; i < text.length; i++) {
            const char = text[i]

            if (char === " " || char === "." || char === "," || char === "!" || char === "?" || char === "'") {
              newText += char
            } else if (i < correctChars) {
              newText += char
            } else if (i < correctChars + 3) {
              // Flicker zone
              newText += Math.random() < 0.3 ? char : getRandomChar()
            } else {
              newText += getRandomChar()
            }
          }

          setDisplayText(newText)
        } else {
          // Reset to random when not visible
          setDisplayText(generateRandomText(text))
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [text])

  return (
    <p ref={elementRef} className={`font-mono ${className}`}>
      {displayText}
    </p>
  )
}
