'use client'

import React, { useState, useCallback, useEffect } from 'react'

import RichText from '@/components/RichText'
import type { ProfileCardsBlock as ProfileCardsType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import clsx from 'clsx'

// A helper type for a single card, derived from the main block type
type Card = ProfileCardsType['cards'][0]

export const ProfileCards: React.FC<ProfileCardsType> = ({ cards, personalSection }) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const openModal = useCallback((card: Card) => {
    setSelectedCard(card)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setSelectedCard(null)
    document.body.style.overflow = 'auto'
  }, [])

  // Effect to handle 'Escape' key press for closing the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeModal])

  return (
    <div className="container my-16">
      <div className="py-0 md:py-8">
        {/* Exploration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 md:mb-20">
          {cards.map((card, i) => (
            <button
              key={i}
              onClick={() => openModal(card)}
              className={clsx(
                'glass group text-left h-[280px] p-6 flex flex-col justify-between rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4',
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-body text-foreground/80">{card.previewText}</p>
              </div>
              <p className="text-caption">{card.hintText}</p>
            </button>
          ))}
        </div>

        {/* Personal Touch Section */}
        {personalSection && (
          <div className="glass max-w-3xl mx-auto text-center p-8 md:p-12 rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-coral-bright to-purple-bloom text-4xl text-white">
              {personalSection.avatarEmoji}
            </div>
            <div className="prose prose-invert max-w-none text-body-large text-center mx-auto mb-8">
              {personalSection.bioText && <RichText data={personalSection.bioText as any} />}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {personalSection.ctas
                ?.filter((cta) => Boolean(cta?.url && cta.url.trim().length > 0))
                .map((cta, i) => (
                  <CMSLink key={i} url={cta.url!} label={cta.label} appearance="default" />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in"
          onClick={closeModal}
        >
          <div
            className="glass relative max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-2xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:bg-secondary/20 hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="mb-6">{selectedCard.title}</h2>
            <div className="prose prose-invert max-w-none text-body">
              {selectedCard.modalContent && <RichText data={selectedCard.modalContent as any} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
