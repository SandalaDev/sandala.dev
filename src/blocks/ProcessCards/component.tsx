'use client'

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import RichText from '@/components/RichText'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Draggable)

type ProcessCardsBlockProps = {
  headline?: string
  heading?: any
  steps?: Array<{
    stepNumber: number
    title: string
    description: string
  }>
}

export const ProcessCardsBlock: React.FC<ProcessCardsBlockProps> = ({
  headline,
  heading,
  steps,
}) => {
  // Refs for GSAP animations
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // State for progress tracking
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isInHorizontalSection, setIsInHorizontalSection] = useState(false)

  // Animation instances
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null)
  const progressTween = useRef<gsap.core.Tween | null>(null)
  const cardAnimations = useRef<gsap.core.Timeline | null>(null)

  // Validate steps data
  const validSteps = steps && Array.isArray(steps) && steps.length > 0

  useEffect(() => {
    if (!validSteps || !cardsRef.current || !cardsContainerRef.current) return

    const cards = Array.from(cardsRef.current.children) as HTMLElement[]
    const numCards = cards.length

    if (numCards === 0) return

    // Kill existing animations
    if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill()
    if (progressTween.current) progressTween.current.kill()
    if (cardAnimations.current) cardAnimations.current.kill()

    // Calculate scroll distance based on number of cards
    const scrollDistance = numCards * window.innerHeight * 0.8

    // Set up initial card positioning - IMPORTANT: Set initial states immediately
    gsap.set(cardsRef.current, {
      display: 'flex',
      gap: '2rem',
      alignItems: 'center',
    })

    // Set consistent initial states for all cards to prevent fade-in artifacts
    gsap.set(cards, {
      width: '320px',
      flexShrink: 0,
      opacity: 1, // Start fully visible
      scale: 0.95, // Start slightly smaller
      y: 0,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    })

    // Set the center card to be highlighted initially
    if (cards[0]) {
      gsap.set(cards[0], {
        opacity: 1,
        scale: 1.05,
        y: -20,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      })
    }

    // Create a single timeline for card animations to avoid conflicts
    cardAnimations.current = gsap.timeline()

    // Create the main horizontal scroll animation
    const cardWidth = 352 // 320px + 32px gap
    const horizontalTween = gsap.to(cardsRef.current, {
      x: () => {
        const containerWidth = cardsContainerRef.current?.offsetWidth || window.innerWidth
        const centerOffset = (containerWidth - 320) / 2
        return -(cardWidth * (numCards - 1)) + centerOffset
      },
      ease: 'none',
    })

    // Create scroll hijacking with ScrollTrigger
    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${scrollDistance}`,
      scrub: 1, // Increase scrub value for smoother, less jittery movement
      pin: true,
      pinSpacing: true,
      refreshPriority: -1,
      animation: horizontalTween,
      onUpdate: (self) => {
        const progress = self.progress
        setCurrentProgress(progress)

        // Throttle card animations to reduce jitter
        if (cardAnimations.current) {
          cardAnimations.current.clear()

          // Calculate current focus card based on progress
          const currentCardIndex = progress * (numCards - 1)

          // Update card states based on distance from focus
          cards.forEach((card, index) => {
            const distanceFromCenter = Math.abs(index - currentCardIndex)

            let targetState: any = {
              duration: 0.3, // Shorter duration for smoother transitions
              ease: 'power2.out',
            }

            if (distanceFromCenter < 0.5) {
              // Center card: elevated and fully visible
              targetState = {
                ...targetState,
                opacity: 1,
                scale: 1.05,
                y: -20,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              }
            } else if (distanceFromCenter <= 1.5) {
              // Side cards: slightly faded and lower
              targetState = {
                ...targetState,
                opacity: 0.75,
                scale: 0.95,
                y: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              }
            } else {
              // Cards further away: more faded and lower
              targetState = {
                ...targetState,
                opacity: 0.5,
                scale: 0.9,
                y: 10,
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
              }
            }

            cardAnimations.current?.to(card, targetState, '<') // Start all animations at the same time
          })
        }

        // Update progress bar smoothly
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: progress,
          })
        }
      },
      onEnter: () => {
        setIsInHorizontalSection(true)
        // Ensure cards are visible when entering
        gsap.set(cardsRef.current, { opacity: 1 })
      },
      onLeave: () => {
        setIsInHorizontalSection(false)
      },
      onEnterBack: () => {
        setIsInHorizontalSection(true)
      },
      onLeaveBack: () => {
        setIsInHorizontalSection(false)
      },
    })

    // Enhanced mobile touch support
    if (ScrollTrigger.isTouch) {
      Draggable.create(cardsRef.current, {
        type: 'x',
        inertia: true,
        bounds: {
          minX: -(cardWidth * (numCards - 1)),
          maxX: 0,
        },
        snap: {
          x: (endValue: number) => {
            const containerWidth = cardsContainerRef.current?.offsetWidth || window.innerWidth
            const centerOffset = (containerWidth - 320) / 2
            const cardIndex = Math.round((centerOffset - endValue) / cardWidth)
            return centerOffset - cardIndex * cardWidth
          },
        },
        onDrag: function () {
          // Sync with ScrollTrigger more efficiently
          if (scrollTriggerInstance.current) {
            const containerWidth = cardsContainerRef.current?.offsetWidth || window.innerWidth
            const centerOffset = (containerWidth - 320) / 2
            const maxScroll = -(cardWidth * (numCards - 1)) + centerOffset
            const progress = gsap.utils.clamp(
              0,
              1,
              (centerOffset - this.x) / (centerOffset - maxScroll),
            )
            scrollTriggerInstance.current.progress(progress)
          }
        },
      })
    }

    // Cleanup function
    return () => {
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill()
      if (progressTween.current) progressTween.current.kill()
      if (cardAnimations.current) cardAnimations.current.kill()
      ScrollTrigger.refresh()
    }
  }, [validSteps, steps])

  // Handle responsive behavior with debouncing
  useEffect(() => {
    if (!validSteps) return

    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100) // Debounce resize events
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [validSteps])

  // Early return after all hooks
  if (!validSteps) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="my-32"
      style={{
        marginTop: '8rem',
        marginBottom: '8rem',
      }}
    >
      {/* Headline */}
      {headline ? (
        <p className="text-sm uppercase tracking-widest text-primary text-center mb-4 font-medium">
          {headline}
        </p>
      ) : null}

      {/* Main Heading */}
      {heading && (
        <div className="text-center mb-16">
          {typeof heading === 'string' ? (
            <h2 className="text-3xl md:text-4xl font-bold font-heading">{heading}</h2>
          ) : (
            <RichText
              className="text-3xl md:text-4xl font-bold font-heading"
              data={heading as any}
              enableGutter={false}
            />
          )}
        </div>
      )}

      {/* Horizontal Scroll Container */}
      <div className="relative" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent rounded-full overflow-hidden z-10">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 origin-left transform scale-x-0 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgba(var(--primary), 0.8) 0%, rgba(var(--primary), 1) 50%, rgba(var(--primary), 0.8) 100%)',
            }}
          />
        </div>

        {/* Cards Container */}
        <div
          ref={cardsContainerRef}
          className="relative overflow-hidden"
          style={{
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0',
          }}
        >
          <div
            ref={cardsRef}
            className="flex items-center"
            style={{
              gap: '2rem',
              justifyContent: 'center',
              opacity: 1, // Ensure initial visibility
            }}
          >
            {steps.map((step, index) => {
              // Safety check for individual step data
              if (!step || !step.stepNumber || !step.title || !step.description) {
                return null
              }

              return (
                <div
                  key={index}
                  className="w-[320px] p-8 bg-card/6 backdrop-blur-[20px] rounded-3xl border border-secondary/30 relative transition-all duration-300 hover:bg-card/10 group flex-shrink-0"
                  style={{
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    // Ensure initial visibility
                    opacity: 1,
                  }}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 right-6 w-10 h-10 bg-primary text-accent rounded-full flex items-center justify-center font-heading font-bold text-lg shadow-lg">
                    {step.stepNumber}
                  </div>

                  {/* Content */}
                  <div className="pt-4 flex-grow">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-4 group-hover:text-foreground transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="font-sans font-light text-base text-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-coral-whisper/5 to-purple-bloom/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Scroll Instructions */}
        <div className="text-center mt-6">
          {isInHorizontalSection ? (
            <div className="text-sm text-primary/60 animate-pulse">
              <span className="hidden md:inline">Continue scrolling to navigate through steps</span>
              <span className="md:hidden">Swipe horizontally or scroll to navigate</span>
            </div>
          ) : (
            <div className="text-sm text-primary/60">Scroll down to explore the process</div>
          )}
        </div>
      </div>
    </div>
  )
}
