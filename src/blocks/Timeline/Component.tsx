'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface TagItem {
  tag: string
  id?: string
}

interface TimelineRole {
  role: string
  company: string
  description?: any
  tags?: TagItem[]
  id?: string
}

interface TimelineItem {
  period: string
  isDual?: boolean
  role?: string
  company?: string
  description?: any
  tags?: TagItem[]
  roles?: TimelineRole[]
  id?: string
}

interface EpochGroup {
  items?: TimelineItem[]
}

interface InterestImage {
  img: string | MediaType
  alt?: string
  id?: string
}

interface Interest {
  cat: string
  imgs?: InterestImage[]
  desc?: any
  id?: string
}

interface TimelineBlockProps {
  title?: string | null
  subtitle?: any
  foundation?: EpochGroup | null
  convergence?: EpochGroup | null
  awakening?: EpochGroup | null
  cards?: {
    bio?: {
      title?: string | null
      teaser?: string | null
      emphasis?: string | null
      content?: any
    } | null
    int?: {
      title?: string | null
      teaser?: string | null
      emphasis?: string | null
      img?: string | MediaType | null
      list?: Interest[] | null
    } | null
  } | null
}

// Utility functions for common styling patterns
const createNavigationButtonClasses = () => {
  return cn('text-left flex items-center gap-3 lg:gap-4 py-2 group transition-colors duration-200')
}

const createTimelineDotClasses = () => {
  return cn(
    'absolute -left-[12px] top-6 w-6 h-6 rounded-full bg-primary border-4',
    'border-purple-dusk shadow-sm dark:border-coral-deep/35',
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

// Dedicated TagList component
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
          key={tagItem.id || tagIdx}
          className="text-xs font-medium px-2 py-1 rounded-3xl bg-secondary/50 text-coral-bright dark:text-coral-pink border border-secondary/20"
        >
          {tagItem.tag}
        </li>
      ))}
    </ul>
  )
}

// Hard-coded epoch configuration with sci-fi labels
const EPOCH_CONFIGS = {
  foundation: {
    label: 'Epoch: Foundation',
    period: 'Circa 2001 - 2006',
  },
  convergence: {
    label: 'Epoch: Convergence',
    period: 'Circa 2007 - 2015',
  },
  awakening: {
    label: 'Epoch: Awakening',
    period: 'Circa 2016 - Present',
  },
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({
  title,
  subtitle,
  foundation,
  convergence,
  awakening,
  cards,
}) => {
  const [activeEpoch, setActiveEpoch] = useState<string>('foundation')
  const [selectedModal, setSelectedModal] = useState<'biography' | 'interests' | null>(null)
  const epochRefs = useRef<Record<string, HTMLElement | null>>({})
  const epochObserverRef = useRef<IntersectionObserver | null>(null)
  const { lockScroll, unlockScroll } = useScrollLock()

  // Normalize epochs into a consistent structure
  const epochs = [
    { name: 'foundation', data: foundation },
    { name: 'convergence', data: convergence },
    { name: 'awakening', data: awakening },
  ].filter((epoch) => epoch.data?.items && epoch.data.items.length > 0)

  // Modal control functions
  const openModal = useCallback(
    (modalType: 'biography' | 'interests') => {
      setSelectedModal(modalType)
      lockScroll()
    },
    [lockScroll],
  )

  const closeModal = useCallback(() => {
    setSelectedModal(null)
    unlockScroll()
  }, [unlockScroll])

  // Handle escape key for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedModal) {
        closeModal()
      }
    }

    if (selectedModal) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeModal, selectedModal])

  // IntersectionObserver-based scroll spy
  useEffect(() => {
    if (epochs.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
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
        .sort((a, b) => b.ratio - a.ratio)

      if (visibleEpochs.length > 0 && visibleEpochs[0]?.epochName) {
        setActiveEpoch(visibleEpochs[0].epochName)
      }
    }, observerOptions)

    Object.values(epochRefs.current).forEach((el) => {
      if (el && epochObserverRef.current) {
        epochObserverRef.current.observe(el)
      }
    })

    return () => {
      epochObserverRef.current?.disconnect()
    }
  }, [epochs])

  if (epochs.length === 0) return null

  return (
    <div className="relative w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Sidebar: Header + Navigation + Profile Cards */}
        <aside className="lg:sticky lg:top-20 self-start">
          {title && <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary">{title}</h2>}
          {subtitle && (
            <div className="text-base lg:text-lg xl:text-xl text-primary leading-relaxed mb-8 font-light">
              <RichText data={subtitle} enableGutter={false} enableProse={false} />
            </div>
          )}

          {/* Navigation */}
          <nav
            className="flex flex-col gap-3 lg:gap-4 text-base lg:text-lg font-medium mb-8"
            role="navigation"
            aria-label="Timeline epochs navigation"
          >
            {epochs.map((epoch) => {
              const isActive = activeEpoch === epoch.name
              const config = EPOCH_CONFIGS[epoch.name as keyof typeof EPOCH_CONFIGS]

              return (
                <button
                  key={epoch.name}
                  className={createNavigationButtonClasses()}
                  onClick={() =>
                    epochRefs.current[epoch.name]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                  }
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Navigate to ${config.label} section`}
                >
                  <span
                    className={cn(
                      'h-0.5 transition-all duration-300 rounded-full',
                      isActive
                        ? 'bg-primary w-12 dark:bg-coral-blush'
                        : 'bg-purple-dusk/80 w-6 group-hover:w-8 group-hover:bg-coral-bright/50 dark:bg-coral-blush/80',
                    )}
                  />
                  <span
                    className={cn(
                      'transition-colors duration-300',
                      isActive
                        ? 'text-purple-shadow font-semibold dark:text-coral-mist'
                        : 'text-purple-dusk group-hover:text-coral-bright/50 dark:text-coral-blush',
                    )}
                  >
                    {config.label}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Profile Cards Section */}
          {cards && (
            <div className="flex flex-col gap-6 mb-8">
              {/* Biography Card */}
              {cards.bio && (
                <button
                  onClick={() => openModal('biography')}
                  className="glass group text-left min-h-[16rem] lg:min-h-[18rem] xl:min-h-[20rem] p-6 lg:p-8 flex flex-col justify-between rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: '100ms' }}
                >
                  <div className="flex flex-col items-center gap-4 lg:gap-6">
                    <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground mb-3 lg:mb-4 dark:text-coral-bright self-start">
                      {cards.bio.title || 'Who I am'}
                    </h3>
                    <p className="text-sm lg:text-base text-coral-bright leading-relaxed dark:text-foreground/80 self-start">
                      {cards.bio.teaser ||
                        'Discover the journey, experiences, and passion that drive my work and creativity.'}
                    </p>
                    <Logo className="w-full my-8" />
                    <p className="text-xs lg:text-sm italic text-coral-bright font-medium  dark:text-coral-bright self-start ">
                      {cards.bio.emphasis || 'Click to learn more about my story'}
                    </p>
                  </div>
                </button>
              )}

              {/* Interests Card */}
              {cards.int && (
                <button
                  onClick={() => openModal('interests')}
                  className="glass group text-left min-h-[16rem] lg:min-h-[18rem] xl:min-h-[20rem] p-6 lg:p-8 flex flex-col justify-between rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 overflow-hidden relative"
                  style={{ animationDelay: '200ms' }}
                >
                  {cards.int.img && (
                    <div className="absolute inset-0 opacity-45 group-hover:opacity-55 transition-opacity">
                      <Media resource={cards.int.img} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="relative z-10 flex-1">
                    <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground mb-3 lg:mb-4 prose dark:text-coral-bright">
                      {cards.int.title || 'The way I am'}
                    </h3>
                    <p className="text-sm lg:text-base text-coral-bright leading-relaxed dark:text-foreground/80">
                      {cards.int.teaser ||
                        'Explore the interests, hobbies, and passions that shape my perspective and inspire my creativity.'}
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm italic text-coral-bright font-medium relative z-10 mt-4 dark:text-coral-bright">
                    {cards.int.emphasis || 'See what drives my creativity'}
                  </p>
                </button>
              )}
            </div>
          )}
        </aside>

        {/* Right Side: Timeline Content */}
        <section className="relative">
          {/* Epoch Intro */}
          <div className="text-coral-bright inline-flex flex-col gap-1 px-5 py-2 mb-4 rounded-2xl backdrop-blur-sm min-w-[60%] bg-gradient-to-br from-purple-base/20 via-purple-dusk/15 to-coral-pink/20 border border-coral-blush/40 dark:border-coral-bright/30 shadow-lg">
            <h4>
              This is an intro explaining what the epochs are, they tie together how my background
              prepares me for this
            </h4>
          </div>
          <div className="relative border-l border-purple-dusk/55 dark:border-coral-pink/60 ml-4">
            {epochs.map((epoch, epochIndex) => {
              const items = epoch.data?.items || []
              const config = EPOCH_CONFIGS[epoch.name as keyof typeof EPOCH_CONFIGS]

              return (
                <section
                  key={epoch.name}
                  ref={(el) => {
                    epochRefs.current[epoch.name] = el
                  }}
                  className="mb-16 last:mb-0"
                  data-epoch-name={epoch.name}
                  aria-labelledby={`epoch-heading-${epoch.name}`}
                >
                  <div className="mb-8 -ml-4">
                    <div className="inline-flex flex-col gap-1 px-5 py-2.5 rounded-2xl backdrop-blur-sm min-w-[60%] bg-gradient-to-br from-purple-base/20 via-purple-dusk/15 to-coral-pink/20 border border-coral-blush/40 dark:border-coral-bright/30 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-coral-bright animate-pulse" />
                        <h3
                          id={`epoch-heading-${epoch.name}`}
                          className="text-purple-base dark:text-coral-bright font-bold text-sm tracking-widest uppercase"
                        >
                          {config.label}
                        </h3>
                      </div>
                      <span className="text-purple-dusk dark:text-coral-pink text-xs font-mono tracking-wide pl-3.5 opacity-80">
                        {config.period}
                      </span>
                    </div>
                  </div>

                  {items.map((item, itemIndex) => {
                    if (!item) return null

                    const itemKey = item.id || `item-${epochIndex}-${itemIndex}`

                    return (
                      <article
                        key={itemKey}
                        className="relative pl-8 mb-8 animate-fadeInUp"
                        style={{ animationDelay: `${itemIndex * 0.08}s` }}
                        role="listitem"
                      >
                        <span className={createTimelineDotClasses()} aria-hidden="true" />

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
                                          <p className="text-sm text-coral-bright dark:text-coral-pink font-style: italic pt-2 pb-0">
                                            relevant skills gained in role
                                          </p>
                                          <TagList tags={role.tags} className="mt-3" />
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
                                  <p className="text-sm text-coral-bright dark:text-coral-pink font-style: italic pt-2 pb-0">
                                    relevant skills gained
                                  </p>
                                  <TagList tags={item.tags} className="mt-1" />
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
      {selectedModal === 'biography' && cards?.bio && (
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
                {cards.bio.title || 'Who I am'}
              </h2>
            </div>
            <div
              id="biography-modal-content"
              className="prose prose-invert max-w-none text-foreground"
            >
              {cards.bio.content && (
                <RichText data={cards.bio.content} enableGutter={false} enableProse={true} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interests Modal */}
      {selectedModal === 'interests' && cards?.int && (
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
              {cards.int.img && (
                <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-gradient-to-r from-coral-bright to-purple-bloom shadow-2xl">
                  <Media resource={cards.int.img} className="w-full h-full object-cover" />
                </div>
              )}
              <h2 id="interests-modal-title" className="text-4xl font-bold text-primary mb-6">
                {cards.int.title || 'The way I am'}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {cards.int.teaser}
              </p>
            </div>

            {/* Interests Sections */}
            {cards.int.list && cards.int.list.length > 0 && (
              <div
                id="interests-modal-content"
                className="space-y-16"
                role="region"
                aria-label="Personal interests categories"
              >
                {cards.int.list.map((interest, idx) => {
                  if (!interest?.cat) return null

                  const interestKey = interest.id || `interest-${idx}`

                  return (
                    <div
                      key={interestKey}
                      className="animate-in fade-in slide-in-from-bottom-4"
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                        {interest.cat}
                      </h3>

                      {interest.imgs && interest.imgs.length > 0 && (
                        <div className="mb-8">
                          <div
                            className={cn(
                              'grid gap-4 mb-6',
                              interest.imgs.length === 1
                                ? 'grid-cols-1 max-w-md mx-auto'
                                : interest.imgs.length === 2
                                  ? 'grid-cols-2 max-w-2xl mx-auto'
                                  : interest.imgs.length === 3
                                    ? 'grid-cols-3 max-w-3xl mx-auto'
                                    : interest.imgs.length === 4
                                      ? 'grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto'
                                      : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-5xl mx-auto',
                            )}
                          >
                            {interest.imgs.map((imageItem, imgIdx) => {
                              if (!imageItem || !imageItem.img) return null

                              return (
                                <div
                                  key={imgIdx}
                                  className="glass aspect-square rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-300 group"
                                >
                                  <Media
                                    resource={imageItem.img}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    alt={imageItem.alt || `${interest.cat} image ${imgIdx + 1}`}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {interest.desc && (
                        <div className="glass p-8 rounded-3xl">
                          <div className="prose prose-invert max-w-none text-foreground">
                            <RichText
                              data={interest.desc}
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
