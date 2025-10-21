'use client'
import React, { useState } from 'react'
import { MessageCircle, Video, Zap, X } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'
import { TECH_ICONS, getIconLabel, type TechIcon } from '@/constants/icons'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Form } from '@payloadcms/plugin-form-builder/types'

type ContactCard = {
  id?: string
  topIcon?: string
  bottomIcon?: 'message-circle' | 'video' | 'zap'
  subtitle?: string
  title?: string
  description?: SerializedEditorState
  note?: SerializedEditorState
  form?: Form
  crossLinks?: Array<{
    text?: string
    linkText?: string
    targetCardId?: string
  }>
}

type ContactHubBlockProps = {
  blockType?: 'contactHub'
  title?: string
  subtitle?: SerializedEditorState
  contactCards?: ContactCard[]
}

type Props = {
  className?: string
} & ContactHubBlockProps

const iconMap = {
  'message-circle': MessageCircle,
  video: Video,
  zap: Zap,
}

export const ContactHubBlock: React.FC<Props> = ({ className, title, subtitle, contactCards }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openModal = (cardId: string) => {
    setActiveModal(cardId)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = 'auto'
  }

  const switchModal = (fromType: string, toType: string) => {
    closeModal()
    setTimeout(() => openModal(toType), 300)
  }

  return (
    <div className={cn('container', className)}>
      {/* Hero Section */}
      <div className="text-center mb-16 py-8">
        {title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            {title}
          </h1>
        )}
        {subtitle && (
          <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            <RichText data={subtitle} enableGutter={false} />
          </div>
        )}
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {contactCards?.map((card, index) => {
          const IconComponent = iconMap[card.bottomIcon as keyof typeof iconMap]
          const TechIconComponent = card.topIcon ? TECH_ICONS[card.topIcon as TechIcon] : null
          const techIconLabel = card.topIcon ? getIconLabel(card.topIcon as TechIcon) : ''

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 glass shadow-card hover:shadow-2xl border border-border/50 hover:border-primary/50"
              onClick={() => openModal(card.id || `card-${index}`)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 text-primary-foreground">
                  {TechIconComponent ? (
                    <TechIconComponent size={32} aria-label={techIconLabel} />
                  ) : (
                    <div className="w-8 h-8 bg-primary-foreground rounded" />
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                {card.subtitle && (
                  <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                    {card.subtitle}
                  </div>
                )}

                {card.title && (
                  <h3 className="text-xl font-bold text-foreground mb-4">{card.title}</h3>
                )}

                {card.description && (
                  <div className="text-muted-foreground mb-6 leading-relaxed">
                    <RichText data={card.description} enableGutter={false} />
                  </div>
                )}

                {card.note && (
                  <div className="p-4 bg-accent/20 rounded-lg border-l-4 border-accent">
                    <div className="text-sm text-accent-foreground">
                      <RichText data={card.note} enableGutter={false} />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Icon */}
              {IconComponent && (
                <div className="absolute bottom-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modals */}
      {contactCards?.map((card, index) => {
        const cardId = card.id || `card-${index}`
        const isActive = activeModal === cardId

        return (
          <div
            key={`modal-${index}`}
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
              isActive ? 'visible opacity-100' : 'invisible opacity-0',
            )}
            style={{
              background: isActive ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
              backdropFilter: isActive ? 'blur(10px)' : 'none',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal()
            }}
          >
            <div
              className={cn(
                'relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl shadow-2xl border border-border/50 transition-transform duration-300',
                isActive ? 'scale-100' : 'scale-95',
              )}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <h2 className="text-2xl font-bold text-foreground">{card.title}</h2>
                <button
                  onClick={closeModal}
                  className=" w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-secondary hover:text-secondary/80" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {card.form && (
                  <FormBlock enableIntro={false} form={card.form} id={`form-${cardId}`} />
                )}

                {/* Cross-link suggestions */}
                {card.crossLinks && card.crossLinks.length > 0 && (
                  <div className="mt-6 p-4 bg-card/60 rounded-lg border border-border/30">
                    {card.crossLinks.map((crossLink, linkIndex) => (
                      <p key={linkIndex} className="text-sm text-card-foreground mb-2 last:mb-0">
                        {crossLink.text}{' '}
                        <button
                          onClick={() => {
                            const targetCard = contactCards.find(
                              (c) => c.id === crossLink.targetCardId,
                            )
                            if (targetCard) {
                              switchModal(cardId, crossLink.targetCardId || '')
                            }
                          }}
                          className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card rounded-sm"
                        >
                          {crossLink.linkText}
                        </button>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
