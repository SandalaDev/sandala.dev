'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, headline, subhead }) => {
  return (
    <div className="relative container min-h-[85vh] max-sm:min-h-[70vh] py-12 max-sm:py-6 overflow-hidden">
      <div className="relative grid grid-cols-12 gap-x-4 gap-y-8 max-sm:gap-x-2 max-sm:gap-y-4 h-full">
        {/* Profile image - smaller on mobile, stays on right */}
        <div className="col-span-5 col-start-8 md:col-span-4 md:col-start-9 max-sm:col-span-4 max-sm:col-start-9 row-start-1 rounded-3xl">
          <div className="relative h-full rounded-3xl aspect-square max-sm:aspect-auto max-sm:max-h-[35vh]">
            {/* Decorative frame elements - scaled down for mobile */}
            <div className="absolute -inset-2 max-sm:-inset-1 bg-gradient-to-br from-primary/20 to-secondary/15 rounded-3xl rotate-1"></div>
            <div className="absolute -inset-1 max-sm:-inset-0.5 bg-gradient-to-tl from-secondary/10 to-primary/20 rounded-3xl -rotate-1"></div>

            {/* Main image container */}
            <div className="relative h-full rounded-3xl">
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

        {/* Headline - larger and more prominent on mobile */}
        {headline && (
          <div className="col-span-7 md:col-span-7 max-sm:col-span-8 max-sm:col-start-1 row-start-1 flex flex-col justify-end max-sm:justify-center max-sm:pr-2">
            <div className="lowercase [&_h1]:text-6xl md:[&_h1]:text-6xl lg:[&_h1]:text-7xl xl:[&_h1]:text-8xl max-sm:[&_h1]:text-5xl max-sm:leading-tight max-sm:mb-0">
              <div>
                <RichText
                  data={headline}
                  enableProse={false}
                  enableGutter={false}
                  className="text-primary font-black"
                />
              </div>
            </div>
          </div>
        )}

        {/* Subhead - positioned below */}
        {subhead && (
          <div className=" col-span-12 row-start-2 max-sm:row-start-2 flex flex-col justify-start max-sm:mt-2">
            <RichText
              data={subhead}
              enableGutter={false}
              enableProse={false}
              className="text-primary font-medium text-2xl md:text-2xl lg:text-2xl max-sm:text-lg max-sm:leading-snug"
            />
          </div>
        )}

        {/* Action links */}
        <div className="col-span-7 max-sm:col-span-12 row-start-3 max-sm:row-start-3 flex items-start">
          {Array.isArray(links) && links.length > 0 && (
            <div className="w-full">
              <ul className="flex flex-wrap gap-4 max-sm:gap-2 list-none">
                {links.map(({ link }, i) => (
                  <li
                    key={i}
                    className="transform hover:scale-105 transition-transform text-lg max-sm:text-sm"
                  >
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Decorative elements - hidden on mobile */}
        <div className="hidden md:block col-span-1 row-span-1 row-start-4 col-start-8 relative">
          <div className="absolute inset-0 flex items-center justify-center align-bottom"></div>
        </div>
        <div className="hidden lg:block col-span-2 row-span-1 row-start-4 col-start-7 relative">
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary/30"></div>
              <div className="w-2 h-2 rounded-full bg-secondary/30"></div>
              <div className="w-2 h-2 rounded-full bg-primary/20"></div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="col-span-6 max-sm:col-span-12 row-start-4 max-sm:row-start-4 flex items-end max-sm:mt-2">
          <div className="w-full">
            <div className="h-px bg-gradient-to-r from-primary/40 via-secondary/20 to-transparent"></div>
            <div className="mt-2 flex justify-between items-center text-sm text-muted-foreground max-sm:text-xs">
              <div className="flex space-x-4 max-sm:space-x-2">
                <div className="w-8 h-px bg-primary/40 max-sm:w-6"></div>
                <div className="w-12 h-px bg-secondary/30 max-sm:w-8"></div>
                <div className="w-6 h-px bg-primary/20 max-sm:w-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
