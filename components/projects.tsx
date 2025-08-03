'use client'

import { ExternalLink, Github } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollAnimation } from '@/components/scroll-animation'
import Image from 'next/image'
import Link from 'next/link'

export function Projects() {
  const projects = [
    {
      title: 'Personal Portfolio',
      description:
        'A personal portfolio website showcasing my projects and skills.',
      image: '/website.png?height=300&width=400',
      tech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
      github: '#',
      live: 'www.baylor-vannote.com',
    },
    {
      title: 'Chess Game',
      description:
        'A chess game built with C# inside Unity featuring AI opponents. With a long term goal of adding a full chess engine.',
      image: '/chess.png?height=300&width=400',
      tech: ['Unity', 'C#', 'AI'],
      github: '#',
      live: '/chess',
    },
    {
      title: 'Idle factory mobile game',
      description:
        'A mobile game where players manage their own factory, optimizing production lines and resources.',
      image: '/underconstruction.jpg?height=300&width=400',
      tech: ['Unity', 'C#', 'Python', 'Blueprints'],
      github: 'coming soon',
      live: 'coming soon',
    },
  ]

  return (
    <section
      id="projects"
      className="py-20 transition-colors duration-500 relative flex items-center justify-center overflow-hidden"
    >
      {/* Hidden letters B, L, E for VARIABLE */}
      <div className="absolute bottom-94 left-8 text-sm font-medium hidden-text pointer-events-none select-none">
        B
      </div>
      <div className="absolute bottom-24 left-602 text-base font-medium hidden-text pointer-events-none select-none transform -rotate-12">
        L
      </div>
      <div className="absolute top-32 left-50 text-sm font-medium hidden-text pointer-events-none select-none">
        E
      </div>

      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="projects-gradient">Featured Projects</span>
          </h2>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ScrollAnimation key={index} index={index}>
              <Card className="bg-card/50 border-border overflow-hidden group hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <CardContent className="p-6 relative z-10">
                  <h3 className="text-xl font-semibold mb-3 text-foreground transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 transition-colors duration-500">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm transition-all duration-300 hover:bg-blue-500/30 hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:text-blue-400 transition-all duration-300 hover:scale-105"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    {project.live && project.live !== 'coming soon' ? (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-blue-400 transition-all duration-300 hover:scale-105"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled
                        className="opacity-50 cursor-not-allowed"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
