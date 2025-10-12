'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article className="relative rounded-2xl overflow-hidden hover:cursor-pointer h-64 w-full">
      {/* Full Background Image */}
      {metaImage && typeof metaImage !== 'string' && (
        <Media
          className="absolute inset-0 w-full h-full object-cover"
          imgClassName="w-full h-full object-cover"
          resource={metaImage}
        />
      )}
      {!metaImage && <div className="absolute inset-0 bg-card" />}

      {/* Content - Bottom Half Only */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2  p-4 flex flex-col justify-end bg-coral-whisper/10 backdrop-blur-md border border-coral-mist/20 shadow-xl">
        {titleToUse && (
          <div className="prose">
            <h3 className="text-coral-pink">
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-2">
            {description && <p className="text-coral-mist">{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}
