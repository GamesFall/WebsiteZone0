'use client'

import { Code, Palette, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animation'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useState, useEffect, useRef } from 'react'

function isAlphaNumeric(char: string) {
  return /[A-Za-z0-9]/.test(char)
}

function getRandomChar() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return chars[Math.floor(Math.random() * chars.length)]
}

// Scramble only a few random positions in the string, but only letters/numbers
function partialScramble(
  current: string,
  target: string,
  count: number,
  revealed = 0
) {
  const arr = current.split('')
  // Find indices of alphanumerics after revealed
  const scrambleIndices = []
  for (let i = revealed; i < arr.length; i++) {
    if (isAlphaNumeric(target[i])) scrambleIndices.push(i)
  }
  for (let i = 0; i < count && scrambleIndices.length > 0; i++) {
    const idx =
      scrambleIndices[Math.floor(Math.random() * scrambleIndices.length)]
    if (arr[idx] !== target[idx]) {
      arr[idx] = getRandomChar()
    }
  }
  return arr.join('')
}

// Generate a fully scrambled string, but keep spaces/punctuation
function scrambleText(target: string, revealed: number = 0) {
  return target
    .split('')
    .map((char, i) =>
      i < revealed ? char : isAlphaNumeric(char) ? getRandomChar() : char
    )
    .join('')
}

const mainDescription =
  "I'm a passionate developer with 3+ years of experience creating digital solutions that bridge the gap between design and technology. I love turning complex problems into simple, beautiful, and intuitive solutions."

const features = [
  {
    icon: Code,
    title: 'Development',
    description:
      'Building robust applications with modern technologies and best practices.',
  },
  {
    icon: Palette,
    title: 'Design',
    description:
      'Creating intuitive and beautiful user interfaces that users love.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description:
      'Optimizing for speed, accessibility, and seamless user experiences.',
  },
]

const ANIMATION_SPEED = 40 // ms per character
const SCRAMBLE_COUNT = 2 // how many chars to scramble per tick

export function About() {
  const [isDecoded, setIsDecoded] = useState(false)
  const [mainScramble, setMainScramble] = useState(() =>
    scrambleText(mainDescription)
  )
  const [featuresScramble, setFeaturesScramble] = useState(() =>
    features.map((f) => scrambleText(f.description))
  )

  // Refs for timers and animation state
  const mainTimer = useRef<NodeJS.Timeout | null>(null)
  const mainScrambleLoop = useRef<NodeJS.Timeout | null>(null)
  const featuresTimers = useRef<NodeJS.Timeout[]>([])
  const featuresScrambleLoops = useRef<NodeJS.Timeout[]>([])

  // Scramble loop for main description (runs when encrypted and not animating)
  useEffect(() => {
    if (!isDecoded) {
      if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
      mainScrambleLoop.current = setInterval(() => {
        setMainScramble((prev) =>
          partialScramble(prev, mainDescription, SCRAMBLE_COUNT)
        )
      }, ANIMATION_SPEED)
    } else {
      if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
    }
    return () => {
      if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
    }
  }, [isDecoded])

  // Scramble loop for features (runs when encrypted and not animating)
  useEffect(() => {
    if (!isDecoded) {
      featuresScrambleLoops.current.forEach((t) => clearInterval(t))
      features.forEach((feature, i) => {
        featuresScrambleLoops.current[i] = setInterval(() => {
          setFeaturesScramble((prev) => {
            const next = [...prev]
            next[i] = partialScramble(
              prev[i],
              feature.description,
              SCRAMBLE_COUNT
            )
            return next
          })
        }, ANIMATION_SPEED)
      })
    } else {
      featuresScrambleLoops.current.forEach((t) => clearInterval(t))
    }
    return () => {
      featuresScrambleLoops.current.forEach((t) => clearInterval(t))
    }
  }, [isDecoded])

  // Animate main description (decode/encode)
  useEffect(() => {
    if (mainTimer.current) clearTimeout(mainTimer.current)
    // Only animate if toggling state, not on initial mount
    let reveal: number
    let current: string

    function animateDecode() {
      if (reveal <= mainDescription.length) {
        current =
          mainDescription.slice(0, reveal) +
          partialScramble(
            current.slice(reveal),
            mainDescription.slice(reveal),
            SCRAMBLE_COUNT
          )
        setMainScramble(
          mainDescription.slice(0, reveal) + current.slice(reveal)
        )
        reveal++
        mainTimer.current = setTimeout(animateDecode, ANIMATION_SPEED)
      } else {
        setMainScramble(mainDescription)
        if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
        // Start scramble loop only if encrypted
      }
    }

    function animateEncode() {
      if (reveal >= 0) {
        current =
          mainDescription.slice(0, reveal) +
          scrambleText(mainDescription.slice(reveal))
        setMainScramble(current)
        reveal--
        mainTimer.current = setTimeout(animateEncode, ANIMATION_SPEED)
      } else {
        setMainScramble(scrambleText(mainDescription))
        // Start scramble loop after animation
        if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
        mainScrambleLoop.current = setInterval(() => {
          setMainScramble((prev) =>
            partialScramble(prev, mainDescription, SCRAMBLE_COUNT)
          )
        }, ANIMATION_SPEED)
      }
    }

    // Only animate on toggle, not on mount
    if (isDecoded) {
      // Stop scramble loop during animation
      if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
      reveal = 0
      current = scrambleText(mainDescription)
      animateDecode()
    } else {
      if (mainScrambleLoop.current) clearInterval(mainScrambleLoop.current)
      reveal = mainDescription.length
      current = mainDescription
      animateEncode()
    }

    return () => {
      if (mainTimer.current) clearTimeout(mainTimer.current)
    }
    // eslint-disable-next-line
  }, [isDecoded])

  // Animate features (decode/encode, bottom up on encode)
  useEffect(() => {
    featuresTimers.current.forEach((t) => clearTimeout(t))
    // Only animate on toggle, not on mount
    features.forEach((feature, i) => {
      const idx = isDecoded ? i : features.length - 1 - i // bottom up on encrypt
      let reveal: number
      let current: string

      function animateDecode() {
        if (reveal <= feature.description.length) {
          current =
            feature.description.slice(0, reveal) +
            partialScramble(
              current.slice(reveal),
              feature.description.slice(reveal),
              SCRAMBLE_COUNT
            )
          setFeaturesScramble((prev) => {
            const next = [...prev]
            next[idx] =
              feature.description.slice(0, reveal) + current.slice(reveal)
            return next
          })
          reveal++
          featuresTimers.current[idx] = setTimeout(
            animateDecode,
            ANIMATION_SPEED
          )
        } else {
          setFeaturesScramble((prev) => {
            const next = [...prev]
            next[idx] = feature.description
            return next
          })
        }
      }

      function animateEncode() {
        if (reveal >= 0) {
          current =
            feature.description.slice(0, reveal) +
            scrambleText(feature.description.slice(reveal))
          setFeaturesScramble((prev) => {
            const next = [...prev]
            next[idx] = current
            return next
          })
          reveal--
          featuresTimers.current[idx] = setTimeout(
            animateEncode,
            ANIMATION_SPEED
          )
        } else {
          setFeaturesScramble((prev) => {
            const next = [...prev]
            next[idx] = scrambleText(feature.description)
            return next
          })
          // Start scramble loop after animation
          if (featuresScrambleLoops.current[idx])
            clearInterval(featuresScrambleLoops.current[idx])
          featuresScrambleLoops.current[idx] = setInterval(() => {
            setFeaturesScramble((prev) => {
              const next = [...prev]
              next[idx] = partialScramble(
                next[idx],
                feature.description,
                SCRAMBLE_COUNT
              )
              return next
            })
          }, ANIMATION_SPEED)
        }
      }

      if (isDecoded) {
        if (featuresScrambleLoops.current[idx])
          clearInterval(featuresScrambleLoops.current[idx])
        reveal = 0
        current = scrambleText(feature.description)
        animateDecode()
      } else {
        if (featuresScrambleLoops.current[idx])
          clearInterval(featuresScrambleLoops.current[idx])
        reveal = feature.description.length
        current = feature.description
        animateEncode()
      }
    })

    return () => {
      featuresTimers.current.forEach((t) => clearTimeout(t))
    }
    // eslint-disable-next-line
  }, [isDecoded])

  return (
    <section
      id="about"
      className="py-20 bg-muted/50 transition-colors duration-500 flex items-center justify-center relative overflow-hidden"
    >
      {/* Hidden letters R, I, A for VARIABLE */}
      <div className="absolute bottom-82 left-8 text-2xl font-medium hidden-text pointer-events-none select-none">
        R
      </div>
      <div className="absolute bottom-72 left-586 text-2xl font-medium hidden-text pointer-events-none select-none">
        I
      </div>
      <div className="absolute top-32 left-56 text-base font-medium hidden-text pointer-events-none select-none transform rotate-12">
        A
      </div>
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">
              <span className="projects-gradient">About Me</span>
            </h2>

            {/* Decode/Encrypt Toggle */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Label
                htmlFor="decode-toggle"
                className="text-sm font-medium text-muted-foreground"
              >
                Encrypt
              </Label>
              <Switch
                id="decode-toggle"
                checked={isDecoded}
                onCheckedChange={(checked) => setIsDecoded(!!checked)}
                className="data-[state=checked]:bg-blue-500"
              />
              <Label
                htmlFor="decode-toggle"
                className="text-sm font-medium text-muted-foreground"
              >
                Decode
              </Label>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <p className="text-lg text-muted-foreground leading-relaxed font-mono min-h-[4rem] max-w-3xl mx-auto whitespace-pre-wrap break-words overflow-hidden transition-all duration-1000 ease-in-out">
                  {mainScramble}
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <ScrollAnimation key={index} index={index}>
                <Card className="bg-card/50 border-border hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="p-8 text-center relative z-10">
                    <IconComponent className="h-12 w-12 text-blue-400 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-300" />
                    <h3 className="text-xl font-semibold mb-4 text-foreground transition-colors duration-500">
                      {feature.title}
                    </h3>
                    <div className="relative min-h-[4rem]">
                      <p className="text-muted-foreground font-mono text-sm min-h-[4rem] max-w-full whitespace-pre-wrap break-words overflow-hidden transition-all duration-1000 ease-in-out">
                        {featuresScramble[index]}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>

        {/* Encryption Info */}
        <ScrollAnimation delay={600}>
          <div className="text-center mt-12">
            <p className="text-xs text-muted-foreground/70 max-w-md mx-auto">
              {isDecoded
                ? 'Text is now decoded and readable'
                : 'Text is encrypted and constantly scrambling - toggle to decode'}
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
