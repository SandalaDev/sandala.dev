'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, headline, subhead }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative container min-h-[85vh] py-12 overflow-hidden ">
      {/* Magazine-style grid layout */}
      <div className="relative grid grid-cols-12 grid-rows-5 gap-4 h-full">
        {/* Profile image - Positioned like a magazine feature photo */}
        <div className="col-span-12 sm:col-span-6 md:col-span-4 md:col-start-9 row-span-3 row-start-1 relative rounded-3xl border border-yellow-500">
          <div className="relative h-full min-h-[200px] sm:min-h-[250px] md:min-h-[400px] rounded-3xl">
            {/* Decorative frame elements */}
            <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-3xl rotate-1"></div>
            <div className="absolute -inset-1 bg-gradient-to-tl from-secondary/10 to-primary/20 rounded-3xl -rotate-1"></div>

            {/* Main image container */}
            <div className="relative h-full min-h-[200px] sm:min-h-[250px] md:min-h-[400px] rounded-3xl">
              <div className="relative h-full glass shadow-card rounded-3xl overflow-hidden">
                {media && (
                  <Media
                    resource={media}
                    fill
                    priority
                    className="object-cover object-center rounded-3xl"
                  />
                )}
              </div>

              {/* Magazine-style overlay accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-foreground/50 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Rich text content - Magazine article style */}
        {headline && (
          <div className="col-span-12 sm:col-span-6 sm:col-start-1 md:col-span-7 md:col-start-1 row-span-2 row-start-1 flex flex-col justify-end border border-blue-600">
            <div className="lowercase [&_h1]:text-3xl sm:[&_h1]:text-4xl md:[&_h1]:text-6xl lg:[&_h1]:text-7xl xl:[&_h1]:text-8xl [&_h1]:leading-tight [&_h1]:mb-2 md:[&_h1]:mb-4">
              <div>
                <RichText data={headline} enableGutter={false} />
              </div>
            </div>
          </div>
        )}

        {subhead && (
          <div className="col-span-12 sm:col-span-6 sm:col-start-1 md:col-span-7 md:col-start-1 row-span-1 row-start-3 flex flex-col justify-start border border-red-400">
            <RichText
              data={subhead}
              enableGutter={false}
              enableProse={false} // <-- important: stop the prose plugin from styling children
              className="font-medium text-xl sm:text-3xl md:text-2xl lg:text-2xl leading-relaxed"
            />
          </div>
        )}

        {/* Decorative quote or accent element */}
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/40 to-transparent "></div>
        <div className="hidden md:block col-span-1 row-span-1 row-start-4 col-start-8 relative ">
          <div className="absolute inset-0 flex items-center justify-center align-bottom "></div>
        </div>

        {/* Action links - Magazine call-to-action style */}
        <div className="col-span-12 sm:col-span-6 sm:col-start-1 md:col-span-6 row-span-1 row-start-4  flex  items-start">
          {Array.isArray(links) && links.length > 0 && (
            <div className="w-full">
              <ul className="flex flex-wrap gap-4 list-none">
                {links.map(({ link }, i) => (
                  <li key={i} className="transform hover:scale-105 transition-transform">
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Decorative elements - Magazine design accents */}
        <div className="hidden lg:block col-span-2 row-span-1 row-start-4 col-start-7 relative">
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary/30"></div>
              <div className="w-2 h-2 rounded-full bg-secondary/30"></div>
              <div className="w-2 h-2 rounded-full bg-primary/20"></div>
            </div>
          </div>
        </div>

        {/* Bottom accent - Magazine footer style */}
        <div className="col-span-12 sm:col-span-6 sm:col-start-1 row-span-1 row-start-5 flex items-end">
          <div className="w-full">
            <div className="h-px bg-gradient-to-r from-primary/40 via-secondary/20 to-transparent"></div>
            <div className="mt-2 flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex space-x-4">
                <div className="w-8 h-px bg-primary/40"></div>
                <div className="w-12 h-px bg-secondary/30"></div>
                <div className="w-6 h-px bg-primary/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
