'use client'

import React from 'react'

// Local fallback type to avoid dependency on generated payload-types during dev
// This matches the fields defined in src/blocks/TextCards/config.ts
type TextCardsBlockProps = {
  cards?: Array<
    | {
        title?: string | null
        body?: unknown
        bodyList?: Array<{ text?: string } | string> | null
        listStyle?: 'none' | 'bullet' | 'check' | null
        footnote?: string | null
      }
    | string
  >
}

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const TextCardsBlock: React.FC<TextCardsBlockProps> = ({ cards }) => {
  const gridRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const container = gridRef.current
    if (!container) return

    const getCards = () =>
      Array.from(container.querySelectorAll('[data-text-card]')) as HTMLElement[]

    const measure = () => {
      const els = getCards()
      if (!els.length) return
      els.forEach((el) => (el.style.height = 'auto'))
      let max = 0
      els.forEach((el) => {
        const h = el.getBoundingClientRect().height
        if (h > max) max = h
      })
      els.forEach((el) => (el.style.height = `${Math.ceil(max)}px`))
    }

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(measure)
      ;(measure as any)._raf2 = raf2
    })

    const ro = new ResizeObserver(() => measure())
    ro.observe(container)
    getCards().forEach((el) => ro.observe(el))
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)

    return () => {
      cancelAnimationFrame(raf1)
      if ((measure as any)._raf2) cancelAnimationFrame((measure as any)._raf2)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  // Determine responsive columns based on card count
  const colsClass = React.useMemo(() => {
    if (!cards) return 'grid-cols-1'
    const n = cards.length
    if (n <= 1) return 'grid-cols-1'
    if (n === 2) return 'grid-cols-1 sm:grid-cols-2'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }, [cards])

  if (!cards || cards.length === 0) return null

  return (
    <div className="container py-12 md:py-16">
      <div
        ref={gridRef}
        className={cn(
          'grid gap-8 max-w-7xl mx-auto items-stretch justify-items-stretch',
          colsClass,
        )}
      >
        {cards.map((card, index) => {
          if (!card || typeof card === 'string') return null

          const { title, body, bodyList, listStyle, footnote } = card as any

          const showList =
            Array.isArray(bodyList) && bodyList.length > 0 && listStyle && listStyle !== 'none'

          return (
            <div
              key={index}
              data-text-card
              style={{ textAlign: 'center' }}
              className={cn(
                'h-full rounded-3xl p-8 glass transition-all duration-300 hover:transform hover:-translate-y-2 flex flex-col w-full text-center',
              )}
            >
              {/* Title */}
              {title && <h4 className="font-bold text-2xl text-primary mb-3">{title}</h4>}

              {/* Body Rich Text */}
              {body && (
                <div className="text-primary mb-4 max-w-none">
                  <RichText data={body} enableGutter={false} enableProse={false} />
                </div>
              )}

              {/* Optional List */}
              {showList && (
                <ul
                  style={{ textAlign: 'left' }}
                  className={cn(
                    'mb-6 space-y-3 text-left',
                    listStyle === 'bullet' && 'list-disc pl-5',
                  )}
                >
                  {bodyList?.map((item, i) => {
                    if (!item || typeof item === 'string') return null
                    return (
                      <li
                        key={i}
                        className={cn('text-sm text-coral-bright flex items-start gap-3 text-left')}
                      >
                        {listStyle === 'check' && (
                          <span className="text-coral-bright font-bold text-xl leading-none mt-0.5">
                            ✓
                          </span>
                        )}
                        <span className="leading-relaxed">{item.text}</span>
                      </li>
                    )
                  })}
                </ul>
              )}

              {/* Spacer to push footnote/CTA */}
              <div className="flex-1" />

              {/* Footnote (plain text, styled here) */}
              {footnote && (
                <div className="mt-4 mb-6">
                  <em className="text-sm text-coral-deep">{footnote}</em>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
