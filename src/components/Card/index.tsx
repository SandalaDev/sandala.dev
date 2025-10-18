'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import type { Project } from '@/payload-types'
import { TECH_ICONS, getIconLabel, type TechIcon } from '@/constants/icons'
import { Media } from '@/components/Media'

export type CardProjectData = Pick<
  Project,
  'slug' | 'categories' | 'meta' | 'title' | 'technologies'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardProjectData
  relationTo?: 'projects'
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, title: titleFromProps } = props
  const { slug, meta, title, technologies } = doc || {}
  const { description, image: metaImage } = meta || {}
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  return (
    <article
      ref={card.ref}
      className={cn(
        'relative w-full aspect-[16/9] overflow-hidden rounded-2xl hover:cursor-pointer',

        className,
      )}
    >
      {/* Full Background Image */}
      {metaImage && typeof metaImage !== 'string' ? (
        <Media
          className="absolute inset-0 w-full h-full object-cover"
          imgClassName="w-full h-full object-cover"
          resource={metaImage}
        />
      ) : (
        <div className="absolute inset-0 bg-card" />
      )}

      {/* Content overlay (bottom half) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 p-4 flex flex-col justify-end bg-coral-whisper/10 backdrop-blur-md border border-coral-mist/20 shadow-xl rounded-2xl">
        {titleToUse && (
          <div className="prose">
            <h3 className="text-primary">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <p className="mt-2 text-primary">{sanitizedDescription}</p>}

        {technologies && technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {technologies.map((tech) => {
              const TechIconComponent = TECH_ICONS[tech as TechIcon]
              const label = getIconLabel(tech as TechIcon)
              if (!TechIconComponent) return null
              return (
                <span
                  key={tech}
                  className="shadow-card inline-flex items-center px-3 py-1 rounded-full text-sm bg-card text-primary"
                >
                  <TechIconComponent size={16} className="mr-2" />
                  {label}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </article>
  )
}
