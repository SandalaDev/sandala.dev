'use client'

import React, { useRef } from 'react'

import type { PricingBlock as PricingBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const PricingBlock: React.FC<PricingBlockProps> = ({ title, subtitle, cards }) => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    const container = gridRef.current
    if (!container) return

    const getCards = () =>
      Array.from(container.querySelectorAll('[data-pricing-card]')) as HTMLElement[]

    const measure = () => {
      const els = getCards()
      if (els.length === 0) return
      // reset before measuring
      els.forEach((el) => (el.style.height = 'auto'))
      let max = 0
      els.forEach((el) => {
        const h = el.getBoundingClientRect().height
        if (h > max) max = h
      })
      els.forEach((el) => (el.style.height = `${Math.ceil(max)}px`))
    }

    // Initial measure after paint
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(measure)
      // store to cancel on cleanup
      ;(measure as any)._raf2 = raf2
    })

    // Re-measure on resize/content changes
    const ro = new ResizeObserver(() => measure())
    ro.observe(container)
    getCards().forEach((el) => ro.observe(el))
    window.addEventListener('resize', measure)

    // In case of late-loading assets
    window.addEventListener('load', measure)

    return () => {
      cancelAnimationFrame(raf1)
      if ((measure as any)._raf2) cancelAnimationFrame((measure as any)._raf2)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
    }
  }, [])

  if (!cards || cards.length === 0) {
    return null
  }

  return (
    <div className="container py-16 md:py-20">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center max-w-4xl mx-auto mb-16">
          {title && <h3 className="font-heading  md: lg: font-bold text-primary mb-6">{title}</h3>}
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      {/* Pricing Cards Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch"
      >
        {cards.map((card, index) => {
          if (!card || typeof card === 'string') return null

          const {
            badge,
            title: cardTitle,
            subtitle: cardSubtitle,
            currency = '$',
            price,
            originalPrice,
            priceNote,
            features,
            note,
            featured,
            cta,
          } = card

          return (
            <div
              key={index}
              data-pricing-card
              className={cn(
                'h-full rounded-3xl overflow-visible relative glass-price p-8 transition-all duration-300 hover:transform hover:-translate-y-2 flex flex-col',
                featured && 'border-2 border-coral-pink',
              )}
            >
              {/* Badge */}
              {badge && (
                <div className=" absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                  <div className="bg-coral-pink text-white px-6 py-2 rounded-3xl  text-sm  tracking-wide shadow-lg">
                    {badge}
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="text-center mb-8">
                {cardTitle && <h3 className=" font-bold text-primary mb-2">{cardTitle}</h3>}
                {cardSubtitle && (
                  <p className="text-muted-foreground text-lg mb-6">{cardSubtitle}</p>
                )}

                {/* Pricing */}
                <div className="mb-4">
                  {originalPrice && (
                    <div className="text-coral-mist text-xl line-through mb-2">
                      {currency}
                      {originalPrice}
                    </div>
                  )}
                  {priceNote && (
                    <div
                      className={cn(
                        'font-bold text-2xl md:text-3xl mb-1',
                        featured ? 'text-coral-pink' : 'text-primary',
                      )}
                    >
                      {priceNote}
                    </div>
                  )}
                  <div
                    className={cn(
                      'font-bold text-4xl md:text-5xl',
                      featured ? 'text-coral-pink' : 'text-primary',
                    )}
                  >
                    {currency}
                    {price}
                  </div>
                </div>
              </div>

              {/* Content Container - Flex-grow to push CTA to bottom */}
              <div className="flex-1 flex flex-col">
                {/* Features */}
                {features && features.length > 0 && (
                  <ul className="space-y-4 mb-8 flex-grow">
                    {features.map((feature, featureIndex) => {
                      if (!feature || typeof feature === 'string') return null

                      return (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="text-coral-pink font-bold text-xl flex-shrink-0 mt-0.5">
                            ✓
                          </div>
                          <div className="flex-1">
                            {feature.title && (
                              <div className="font-semibold text-primary mb-1">{feature.title}</div>
                            )}
                            {feature.description && (
                              <div className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                              </div>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}

                {/* Note */}
                {note && (
                  <div className="glass p-4 mb-6 border-l-4 border-coral-pink">
                    <div className="text-sm text-muted-foreground">
                      {typeof note === 'string' ? (
                        note
                      ) : (
                        <RichText data={note} enableGutter={false} enableProse={false} />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button - Always at bottom */}
              {cta && (
                <div className="mt-auto pt-4">
                  <CMSLink className="w-full justify-center" size="lg" {...cta} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
