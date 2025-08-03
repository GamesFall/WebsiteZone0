'use client'

import { useEffect, useState } from 'react'

export function RotatingCubeText() {
  const titles = [
    'designer',
    'problem solver',
    'creative thinker',
    'react specialist',
    'C# underling',
    'Unity instituter',
    'friend',
    'designer',
    'problem solver',
    'creative thinker',
    'react specialist',
    'C# underling',
    'Unity instituter',
    'friend',
    'evil rhino who goes around creating vortexes of maddness and unfixable bugs',
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentWord = titles[currentIndex]
    let timer: NodeJS.Timeout

    if (!isDeleting && displayText.length < currentWord.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
      }, 150)
    } else if (!isDeleting && displayText.length === currentWord.length) {
      // Finished typing, wait then start deleting
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      timer = setTimeout(() => {
        setDisplayText(displayText.substring(0, displayText.length - 1))
      }, 75)
    } else if (isDeleting && displayText.length === 0) {
      // Finished deleting, move to next word
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % titles.length)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentIndex])

  // Cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-baseline">
      <span className="text-muted-foreground mr-2">I'm a</span>
      <span className="animated-gradient-fast mr-2">developer</span>
      <span className="text-muted-foreground mr-2">& a</span>
      <div className="relative inline-block align-baseline min-w-[200px] text-left">
        <span className="animated-gradient-fast font-medium whitespace-nowrap">
          {displayText}
          <span
            className={`inline-block w-0.5 h-5 bg-current ml-1 transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ verticalAlign: 'text-bottom' }}
          />
        </span>
      </div>
    </div>
  )
}
