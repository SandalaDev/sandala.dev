'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import type { Media as MediaType, TimelineBlock as TimelineBlockType } from '@/payload-types'

interface TimelineBlockProps extends TimelineBlockType {}

// Define the TagItem interface since it's not in the payload-generated types
interface TagItem {
  tag: string
  id?: string
}

// Utility functions for common styling patterns
const createNavigationButtonClasses = () => {
  return cn(
    'text-left flex items-center gap-3 lg:gap-4 py-2 group transition-colors duration-200'
  )
}

const createTimelineDotClasses = () => {
  return cn(
    'absolute -left-[12px] top-6 w-6 h-6 rounded-full bg-primary border-4',
    'border-purple-dusk shadow-sm dark:border-coral-deep/35'
  )
}

// Custom hook for scroll lock with proper cleanup
const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarWidth}px`
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }, [])

  useEffect(() => {
    return () => unlockScroll() // Cleanup on unmount
  }, [unlockScroll])

  return { lockScroll, unlockScroll }
}

// Dedicated TagList component to eliminate duplication
interface TagListProps {
  tags?: TagItem[]
  className?: string
}

const TagList: React.FC<TagListProps> = ({ tags, className = '' }) => {
  if (!tags || tags.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tagItem, tagIdx) => (
        <li
          key={tagItem?.id || tagIdx}
          className="text-xs font-medium px-2 py-1 rounded-3xl bg-secondary/50 text-coral-bright dark:text-coral-pink border border-secondary/20"
        >
          {tagItem?.tag}
        </li>
      ))}
    </ul>
  )
}

export const TimelineBlock: React.FC<TimelineBlockProps> = (props) => {
  const { 
    title, 
    subtitle, 
    layout = 'default', 
    epochs, 
    pCards 
  } = props;
  
  const [activeEpoch, setActiveEpoch] = useState<string>('')
  const [selectedModal, setSelectedModal] = useState<'biography' | 'interests' | null>(null)
  const epochRefs = useRef<Record<string, HTMLElement | null>>({})
  const epochObserverRef = useRef<IntersectionObserver | null>(null)
  const { lockScroll, unlockScroll } = useScrollLock()

  // Modal control functions with proper accessibility
  const openModal = useCallback((modalType: 'biography' | 'interests') => {
    setSelectedModal(modalType)
    lockScroll()
  }, [lockScroll])

  const closeModal = useCallback(() => {
    setSelectedModal(null)
    unlockScroll()
  }, [unlockScroll])

  // Set initial active epoch using stable index
  useEffect(() => {
    if (epochs && epochs.length > 0) {
      const firstEpoch = epochs[0]
      if (firstEpoch?.epochName) {
        setActiveEpoch(firstEpoch.epochName)
      }
    }
  }, [epochs])

  // Handle escape key and focus management for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedModal) {
        closeModal()
      }
    }

    if (selectedModal) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus trap could be added here for full accessibility
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, selectedModal])

  // IntersectionObserver-based scroll spy for better performance
  useEffect(() => {
    if (!epochs || epochs.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when element is in middle 60% of viewport
      threshold: 0.1,
    }

    epochObserverRef.current = new IntersectionObserver((entries) => {
      const visibleEpochs = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => ({
          element: entry.target,
          ratio: entry.intersectionRatio,
          epochName: entry.target.getAttribute('data-epoch-name') || '',
        }))
        .sort((a, b) => b.ratio - a.ratio) // Sort by visibility ratio

      if (visibleEpochs.length > 0 && visibleEpochs[0]?.epochName) {
        setActiveEpoch(visibleEpochs[0].epochName)
      }
    }, observerOptions)

    // Observe all epoch elements
    Object.values(epochRefs.current).forEach((el) => {
      if (el && epochObserverRef.current) {
        epochObserverRef.current.observe(el)
      }
    })

    return () => {
      epochObserverRef.current?.disconnect()
    }
  }, [epochs])

  if (!epochs || epochs.length === 0) return null

  const isGridLayout = layout === 'grid'

  return (
    <div className="relative w-full min-h-screen">
      <div
        className={cn(
          'max-w-7xl mx-auto px-6 py-20',
          isGridLayout ? 'grid grid-cols-1 lg:grid-cols-2 gap-12' : '',
        )}
      >
        {/* Header Section */}
        <aside
          className={cn(isGridLayout ? 'lg:sticky lg:top-20 self-start' : 'text-center mb-12')}
        >
          {title && <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">{title}</h2>}
          {subtitle && (
            <div className="text-lg lg:text-xl xl:text-2xl text-foreground leading-relaxed mb-8 font-medium">
              <RichText data={subtitle} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Navigation for grid layout */}
          {isGridLayout && (
            <nav
              className="flex flex-col gap-3 lg:gap-4 text-base lg:text-lg font-medium mb-8"
              role="navigation"
              aria-label="Timeline epochs navigation"
            >
              {epochs.map((epoch, index) => {
                if (!epoch?.epochName) return null

                const epochKey = epoch.id || `epoch-${index}`
                const isActive = activeEpoch === epoch.epochName

                return (
                  <button
                    key={epochKey}
                    className={createNavigationButtonClasses()}
                    onClick={() =>
                      epochRefs.current[epoch.epochName]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      })
                    }
                    aria-current={isActive ? 'true' : undefined}
                    aria-label={`Navigate to ${epoch.epochName} section`}
                  >
                    <span
                      className={cn(
                        'h-0.5 transition-all duration-300 rounded-full',
                        activeEpoch === epoch.epochName
                          ? 'bg-primary w-12 dark:bg-coral-blush'
                          : 'bg-purple-dusk/80 w-6 group-hover:w-8 group-hover:bg-coral-bright/50  dark:bg-coral-blush/80',
                      )}
                    />
                    <span
                      className={cn(
                        'transition-colors duration-300',
                        activeEpoch === epoch.epochName
                          ? 'text-purple-shadow font-semibold dark:text-coral-mist'
                          : 'text-purple-dusk group-hover:text-coral-bright/50 dark:text-coral-blush',
                      )}
                    >
                      {epoch.epochName.charAt(0).toUpperCase() + epoch.epochName.slice(1)}
                    </span>
                  </button>
                )
              })}
            </nav>
          )}

          {/* Profile Cards Section */}
          {pCards && (
            <div className="flex flex-col gap-6 mb-8">
              {/* Biography Card */}
              {pCards.biographyCard && (
                <button
                  onClick={() => openModal('biography')}
                  className="glass group text-left min-h-[16rem] lg:min-h-[18rem] xl:min-h-[20rem] p-6 lg:p-8 flex flex-col justify-between rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 "
                  style={{ animationDelay: '100ms' }}
                >
                  <div className="flex items-start gap-4 lg:gap-6">
                    <div className="flex-shrink-0">
                      <Logo className="w-12 h-8 lg:w-16 lg:h-12" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground mb-3 lg:mb-4 dark:text-coral-bright">
                        {pCards.biographyCard.title || 'Who I am'}
                      </h3>
                      <p className="text-sm lg:text-base text-coral-bright leading-relaxed dark:text-foreground/80">
                        {pCards.biographyCard.teaserText ||
                          'Discover the journey, experiences, and passion that drive my work and creativity.'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm italic text-coral-bright font-medium mt-4 dark:text-coral-bright">
                    {pCards.biographyCard.emphasisText ||
                      'Click to learn more about my story'}
                  </p>
                </button>
              )}

              {/* Interests Card */}
              {pCards.iCard && (
                <button
                  onClick={() => openModal('interests')}
                  className="glass group text-left min-h-[16rem] lg:min-h-[18rem] xl:min-h-[20rem] p-6 lg:p-8 flex flex-col justify-between rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 overflow-hidden relative"
                  style={{ animationDelay: '200ms' }}
                >
                  {pCards.iCard.cardImage && (
                    <div className="absolute inset-0 opacity-45 group-hover:opacity-55 transition-opacity">
                      <Media
                        resource={pCards.iCard.cardImage}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground mb-3 lg:mb-4 prose dark:text-coral-bright">
                      {pCards.iCard.title || 'The way I am'}
                    </h3>
                    <p className="text-sm lg:text-base text-coral-bright leading-relaxed dark:text-foreground/80">
                        {pCards.iCard.teaserText ||
                          'Explore the interests, hobbies, and passions that shape my perspective and inspire my creativity.'}
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm italic text-coral-bright font-medium relative z-10 mt-4 dark:text-coral-bright">
                    {pCards.iCard.emphasisText || 'See what drives my creativity'}
                  </p>
                </button>
              )}
            </div>
          )}
        </aside>

        {/* Timeline Section */}
        <section className={cn('relative', !isGridLayout && 'max-w-6xl mx-auto')}>
          {!isGridLayout && <h2 className="text-2xl font-semibold mb-8 text-primary">Timeline</h2>}

          <div className="relative border-l border-purple-twilight/55 dark:border-coral-pink/60 ml-4">
            {epochs.map((epoch, epochIndex) => {
              if (!epoch?.epochName || !epoch.items) return null

              const epochKey = epoch.id || `epoch-${epochIndex}`

              return (
                <section
                  key={epochKey}
                  ref={(el) => {
                    epochRefs.current[epoch.epochName] = el
                  }}
                  className="mb-16 last:mb-0"
                  data-epoch-name={epoch.epochName}
                  aria-labelledby={`epoch-heading-${epochKey}`}
                >
                  <div className="mb-8 -ml-4">
                    <div className="inline-flex items-center gap-1.5 px-4 py-0 rounded-3xl backdrop-blur-sm min-w-[50%] bg-coral-pink/40 border border-coral-pink/30 dark:bg-primary/10 dark:border-primary/20">
                      <div className="w-2 h-2 rounded-full bg-primary/60" />
                      <h3
                        id={`epoch-heading-${epochKey}`}
                        className="text-primary font-semibold text-base"
                      >
                        {epoch.epochName.charAt(0).toUpperCase() + epoch.epochName.slice(1)}
                      </h3>
                    </div>
                  </div>

                  {epoch.items.map((item, itemIndex) => {
                    if (!item) return null

                    const itemKey = item.id || `item-${epochIndex}-${itemIndex}`

                    return (
                      <article
                        key={itemKey}
                        className="relative pl-8 mb-8 animate-fadeInUp"
                        style={{ animationDelay: `${itemIndex * 0.08}s` }}
                        role="listitem"
                      >
                        {/* Timeline dot with ARIA label */}
                        <span
                          className={createTimelineDotClasses()}
                          aria-hidden="true"
                        />

                        <div className="glass p-5 rounded-3xl hover:shadow-lg transition-all duration-300 group">
                          <header className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              {item.isDual && item.roles ? (
                                <>
                                  <div className="mb-4">
                                    <span className="text-xs font-medium text-coral-bright/90 uppercase tracking-wide bg-primary/10 px-2 py-1 rounded-3xl">
                                      Concurrent Roles
                                    </span>
                                  </div>
                                  <div className="space-y-4">
                                    {item.roles.map((role, roleIdx) => {
                                      if (!role || typeof role === 'string') return null
                                      return (
                                        <div
                                          key={roleIdx}
                                          className="border-l-2 border-primary/20 pl-4"
                                        >
                                          <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                                            {role.role}
                                          </h3>
                                          <p className="text-sm font-medium text-coral-bright dark:text-coral-pink mt-1">
                                            {role.company}
                                          </p>
                                          {role.description && (
                                            <div className="mt-3 text-sm text-foreground/90 leading-relaxed">
                                              <RichText
                                                data={role.description}
                                                enableGutter={false}
                                                enableProse={false}
                                              />
                                            </div>
                                          )}
                                          <TagList tags={role.tags as TagItem[]} className="mt-3" />
                                        </div>
                                      )
                                    })}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <h3 className="text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors">
                                    {item.role}
                                  </h3>
                                  <p className="text-sm font-medium text-coral-bright dark:text-coral-pink mt-1">
                                    {item.company}
                                  </p>
                                  {item.description && (
                                    <div className="mt-4 text-sm text-foreground/90 leading-relaxed">
                                      <RichText
                                        data={item.description}
                                        enableGutter={false}
                                        enableProse={false}
                                      />
                                    </div>
                                  )}
                                  <TagList tags={item.tags as TagItem[]} className="mt-4" />
                                </>
                              )}
                            </div>
                            <time className="text-sm font-medium text-coral-bright dark:text-coral-pink bg-muted/50 px-3 py-1.5 rounded-3xl flex-shrink-0 border border-muted/30">
                              {item.period}
                            </time>
                          </header>
                        </div>
                      </article>
                    )
                  })}
                </section>
              )
            })}
          </div>
        </section>
      </div>

      {/* Biography Modal */}
      {selectedModal === 'biography' && pCards?.biographyCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="biography-modal-title"
          aria-describedby="biography-modal-content"
        >
          <div
            className="glass relative max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-12 rounded-3xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:bg-secondary/20 hover:text-foreground transition-colors z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="flex items-center gap-4 mb-8">
              <Logo className="w-16 h-12" />
              <h2
                id="biography-modal-title"
                className="text-3xl font-bold text-primary dark:text-coral-bright"
              >
                {pCards.biographyCard.title || 'Who I am'}
              </h2>
            </div>
            <div
              id="biography-modal-content"
              className="prose prose-invert max-w-none text-foreground"
            >
              {pCards.biographyCard.modalContent && (
                <RichText
                  data={pCards.biographyCard.modalContent}
                  enableGutter={false}
                  enableProse={true}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interests Modal */}
      {selectedModal === 'interests' && pCards?.iCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4 animate-in fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="interests-modal-title"
          aria-describedby="interests-modal-content"
        >
          <div
            className="glass relative max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 lg:p-12 rounded-3xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-foreground/70 hover:bg-secondary/20 hover:text-foreground transition-colors z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="text-center mb-12">
              {pCards.iCard.cardImage && (
                <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gradient-to-r from-coral-bright to-purple-bloom shadow-2xl">
                  <Media
                    resource={pCards.iCard.cardImage}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h2
                id="interests-modal-title"
                className="text-4xl font-bold text-primary mb-6"
              >
                {pCards.iCard.title || 'The way I am'}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {pCards.iCard.teaserText}
              </p>
            </div>

            {/* Interests Sections */}
            {pCards.iCard.int &&
              pCards.iCard.int.length > 0 && (
                <div
                  id="interests-modal-content"
                  className="space-y-16"
                  role="region"
                  aria-label="Personal interests categories"
                >
                  {pCards.iCard.int.map((interest, idx) => {
                    if (!interest?.category) return null

                    const interestKey = interest.id || `interest-${idx}`

                    return (
                      <div
                        key={interestKey}
                        className="animate-in fade-in slide-in-from-bottom-4"
                        style={{ animationDelay: `${idx * 150}ms` }}
                      >
                        {/* Interest Category Header */}
                        <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                          {interest.category}
                        </h3>

                        {/* Image Gallery */}
                        {interest.images && interest.images.length > 0 && (
                          <div className="mb-8">
                            <div
                              className={cn(
                                'grid gap-4 mb-6',
                                interest.images.length === 1
                                  ? 'grid-cols-1 max-w-md mx-auto'
                                  : interest.images.length === 2
                                    ? 'grid-cols-2 max-w-2xl mx-auto'
                                    : interest.images.length === 3
                                      ? 'grid-cols-3 max-w-3xl mx-auto'
                                      : interest.images.length === 4
                                        ? 'grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto'
                                        : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-5xl mx-auto',
                              )}
                            >
                              {interest.images.map((imageItem, imgIdx) => {
                                if (!imageItem || !imageItem.image) return null

                                return (
                                  <div
                                    key={imgIdx}
                                    className="glass aspect-square rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
                                  >
                                    <Media
                                      resource={imageItem.image}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      alt={
                                        imageItem.alt || `${interest.category} image ${imgIdx + 1}`
                                      }
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {/* Rich Text Description */}
                        {interest.description && (
                          <div className="glass p-8 rounded-3xl">
                            <div className="prose prose-invert max-w-none text-foreground">
                              <RichText
                                data={interest.description}
                                enableGutter={false}
                                enableProse={true}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
