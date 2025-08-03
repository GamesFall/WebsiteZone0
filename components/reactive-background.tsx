'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function ReactiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const animationRef = useRef<number>()
  const targetMousePos = useRef({ x: 0, y: 0 })
  const currentMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (currentMousePos.current.x === 0 && currentMousePos.current.y === 0) {
        currentMousePos.current = { x: canvas.width / 2, y: canvas.height / 2 }
        targetMousePos.current = { x: canvas.width / 2, y: canvas.height / 2 }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const handleMouseMove = (e: MouseEvent) => {
      targetMousePos.current = { x: e.clientX, y: e.clientY }

      // Find all reveal-proxy elements (social buttons)
      const proxyElements = document.querySelectorAll('.reveal-proxy')
      let minProxyDistance = Infinity

      proxyElements.forEach((proxy) => {
        const rect = proxy.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = e.clientX - centerX
        const dy = e.clientY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < minProxyDistance) minProxyDistance = distance
      })

      // Reveal logic for all .hidden-text elements
      const hiddenElements = document.querySelectorAll('.hidden-text')
      hiddenElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = e.clientX - centerX
        const dy = e.clientY - centerY
        const distanceToLetter = Math.sqrt(dx * dx + dy * dy)

        // For the "A" letter, use min distance to mouse or any proxy
        // For all others, just use mouse distance
        const isA = element.classList.contains('hero-secret-a')
        const distance = isA
          ? Math.min(distanceToLetter, minProxyDistance)
          : distanceToLetter

        // Remove all reveal classes first
        element.classList.remove(
          'light-reveal-close',
          'light-reveal-medium',
          'light-reveal-near',
          'light-reveal-active'
        )

        // Apply appropriate reveal class based on distance
        if (distance < 80) {
          element.classList.add('light-reveal-active')
        } else if (distance < 120) {
          element.classList.add('light-reveal-near')
        } else if (distance < 180) {
          element.classList.add('light-reveal-medium')
        } else if (distance < 250) {
          element.classList.add('light-reveal-close')
        }
      })
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        targetMousePos.current = { x: touch.clientX, y: touch.clientY }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const easing = 0.02
      currentMousePos.current.x +=
        (targetMousePos.current.x - currentMousePos.current.x) * easing
      currentMousePos.current.y +=
        (targetMousePos.current.y - currentMousePos.current.y) * easing

      const lightRadius = Math.min(canvas.width, canvas.height) * 0.8
      const lightOpacity = theme === 'light' ? 0.08 : 0.12

      const layers = [
        { radius: lightRadius * 1.2, opacity: lightOpacity * 0.4 },
        { radius: lightRadius * 0.9, opacity: lightOpacity * 0.6 },
        { radius: lightRadius * 0.6, opacity: lightOpacity * 0.8 },
        { radius: lightRadius * 0.3, opacity: lightOpacity * 1.2 },
      ]

      layers.forEach((layer) => {
        const gradient = ctx.createRadialGradient(
          currentMousePos.current.x,
          currentMousePos.current.y,
          0,
          currentMousePos.current.x,
          currentMousePos.current.y,
          layer.radius
        )

        const lightColor = theme === 'light' ? '#3b82f6' : '#60a5fa'

        gradient.addColorStop(
          0,
          `${lightColor}${Math.floor(layer.opacity * 255)
            .toString(16)
            .padStart(2, '0')}`
        )
        gradient.addColorStop(
          0.3,
          `${lightColor}${Math.floor(layer.opacity * 0.6 * 255)
            .toString(16)
            .padStart(2, '0')}`
        )
        gradient.addColorStop(
          0.7,
          `${lightColor}${Math.floor(layer.opacity * 0.2 * 255)
            .toString(16)
            .padStart(2, '0')}`
        )
        gradient.addColorStop(1, `${lightColor}00`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(
          currentMousePos.current.x,
          currentMousePos.current.y,
          layer.radius,
          0,
          Math.PI * 2
        )
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full"
      style={{
        background: 'transparent',
        zIndex: 1,
        left: 0,
        top: 0,
      }}
    />
  )
}
