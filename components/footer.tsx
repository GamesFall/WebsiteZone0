import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollAnimation } from '@/components/scroll-animation'
import type { AnimationPreset } from './animation-presets'

interface FooterProps {
  preset?: AnimationPreset
}

export function Footer({ preset = 'smooth' }: FooterProps) {
  const [showSecrets, setShowSecrets] = useState(false)

  useEffect(() => {
    if (showSecrets) {
      document.body.classList.add('show-all-secrets')
    } else {
      document.body.classList.remove('show-all-secrets')
    }
    return () => {
      document.body.classList.remove('show-all-secrets')
    }
  }, [showSecrets])

  return (
    <ScrollAnimation className="!translate-y-0">
      <footer className="bg-card border-t border-border py-12 transition-colors duration-500 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-6">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-blue-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground flex items-center justify-center space-x-2">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>by Baylor Van Note</span>
              </p>
              <p className="text-muted-foreground/70 text-sm mt-2">
                © 2024 All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Toggle to reveal all secret letters */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          <label className="text-xs text-muted-foreground select-none cursor-pointer flex items-center space-x-1">
            <input
              type="checkbox"
              checked={showSecrets}
              onChange={() => setShowSecrets((v) => !v)}
              className="accent-blue-500"
            />
            <span>Show all secret letters</span>
          </label>
        </div>
      </footer>
    </ScrollAnimation>
  )
}
