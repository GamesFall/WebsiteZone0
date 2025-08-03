'use client'

import type React from 'react'

import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollAnimation } from '@/components/scroll-animation'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'baylor.van.note@gmail.com' },
    { icon: Phone, title: 'Phone', value: '+1 (719) 246-2497' },
    { icon: MapPin, title: 'Location', value: 'Rochester, MN' },
  ]

  return (
    <section
      id="contact"
      className="py-12 relative flex items-center justify-center overflow-hidden"
    >
      {/* Hidden text elements in contact section */}
      <span className="absolute bottom-28 left-220 text-lg font-semibold hidden-text pointer-events-none select-none inline-block transform -rotate-12">
        Connect
      </span>
      <span className="absolute top-2 left-190 text-xl font-semibold hidden-text pointer-events-none select-none transform rotate-8 inline-block">
        Collaborate
      </span>
      <span className="absolute top-32 left-178 text-lg font-semibold hidden-text pointer-events-none select-none transform -rotate-8 inline-block">
        Expand
      </span>

      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-20">
            <span className="projects-gradient">Get In Touch</span>
          </h2>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-16 max-w-2xl md:max-w-3xl mx-auto w-full">
          <ScrollAnimation delay={200}>
            <div>
              <h3 className="text-3xl font-semibold mb-8 text-foreground">
                {"Let's work together"}
              </h3>
              <p className="text-muted-foreground mb-10 text-xl">
                I'm always interested in new opportunities and exciting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>

              <div className="space-y-8">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-5 group"
                    >
                      <div className="bg-blue-500/20 p-4 rounded-full group-hover:bg-blue-500/30 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold text-lg">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-base">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={400}>
            <Card className="bg-card/50 border-border backdrop-blur-sm shadow-xl">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50 backdrop-blur-sm border-border text-foreground placeholder-muted-foreground focus:border-blue-500 text-lg py-4"
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50 backdrop-blur-sm border-border text-foreground placeholder-muted-foreground focus:border-blue-500 text-lg py-4"
                      required
                    />
                  </div>

                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-background/50 backdrop-blur-sm border-border text-foreground placeholder-muted-foreground focus:border-blue-500 resize-none text-lg py-4"
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-4 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
