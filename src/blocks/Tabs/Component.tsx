'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import type { TabsBlock as TabsBlockType, Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { BENEFIT_ICONS, getIconLabel, type BenefitIcon } from '@/constants/icons'

type Props = TabsBlockType

export const TabsBlock: React.FC<Props> = ({ showcase }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>({})

  // Auto-advance slideshow
  useEffect(() => {
    if (!showcase?.demoTabs) return

    const interval = setInterval(
      () => {
        setCurrentSlides((prev) => {
          const newSlides = { ...prev }
          showcase.demoTabs?.forEach((tab, tabIndex) => {
            const currentSlide = prev[tabIndex] || 0
            const imageCount = getImageCount(tab, 'desktop') // Use desktop as reference for slide count
            if (imageCount > 1) {
              newSlides[tabIndex] = (currentSlide + 1) % imageCount
            }
          })
          return newSlides
        })
      },
      (showcase.slideshowSpeed || 4) * 1000,
    )

    return () => clearInterval(interval)
  }, [showcase?.demoTabs, showcase?.slideshowSpeed])

  // Helper to get image count for a tab and screen size
  const getImageCount = (
    tab: NonNullable<TabsBlockType['showcase']['demoTabs']>[0],
    screenSize: 'desktop' | 'tablet' | 'mobile',
  ) => {
    const images = tab[`${screenSize}Images`]
    return Array.isArray(images) ? images.length : 0
  }

  // Helper to get current image for a tab and screen size
  const getCurrentImage = (
    tab: NonNullable<TabsBlockType['showcase']['demoTabs']>[0],
    tabIndex: number,
    screenSize: 'desktop' | 'tablet' | 'mobile',
  ) => {
    const images = tab[`${screenSize}Images`]
    if (!Array.isArray(images) || images.length === 0) return null

    const slideIndex = currentSlides[tabIndex] || 0
    return images[slideIndex % images.length]
  }

  // Helper component for responsive image rendering
  const ResponsiveImage: React.FC<{
    tab: NonNullable<TabsBlockType['showcase']['demoTabs']>[0]
    tabIndex: number
    screenSize: 'desktop' | 'tablet' | 'mobile'
    className: string
    isActive: boolean
  }> = ({ tab, tabIndex, screenSize, className, isActive }) => {
    const image = getCurrentImage(tab, tabIndex, screenSize)

    if (!image?.image) return null

    return (
      <div className={`absolute inset-0 ${className}`}>
        <Image
          src={
            typeof image.image === 'string'
              ? image.image
              : ((image.image as Media | undefined)?.url ?? '')
          }
          alt={image.altText || `${tab.tabName} mockup`}
          fill
          className="object-contain rounded-lg"
          priority={isActive}
        />
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden container">
      <div className="container mx-auto py-16 md:py-24">
        {/* Interactive Showcase Section */}
        {showcase && (
          <div className="glass rounded-2xl p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h3>{showcase.showcaseHeading}</h3>
              <p className="">{showcase.showcaseSubheading}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Slideshow Demo */}
              <div className="lg:col-span-2">
                <div className="bg-coral-pink/10 border border-coral-pink/40 rounded-3xl overflow-hidden min-h-[400px] md:min-h-[500px]">
                  {/* Tab Headers */}
                  <div className="bg-gradient-to-br from-purple-shadow/40 to-coral-pink/40 p-4">
                    <div className="flex gap-2 flex-wrap">
                      {showcase.demoTabs?.map((tab, index) => (
                        <button
                          key={tab.id || index}
                          className={`py-2 px-4 rounded-2xl transition-all duration-300 text-sm ${
                            index === activeTab
                              ? 'bg-card/30 text-purple-dusk hover:text-primary/40 hover:bg-card/40 shadow-lg shadow-coral-mist/55'
                              : 'bg-card/20 text-coral-mist hover:text-primary hover:bg-card/30 shadow-lg shadow-purple-bloom/40'
                          }`}
                          onClick={() => setActiveTab(index)}
                        >
                          {tab.tabName}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Content */}
                  <div className="relative bg-background/80 backdrop-blur-sm">
                    {showcase.demoTabs?.map((tab, index) => (
                      <div
                        key={tab.id || index}
                        className={`transition-all duration-300 ${
                          index === activeTab ? 'block' : 'hidden'
                        }`}
                      >
                        {/* Responsive Image Display */}
                        <div className="relative aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/10]">
                          <ResponsiveImage
                            tab={tab}
                            tabIndex={index}
                            screenSize="desktop"
                            className="hidden lg:block"
                            isActive={index === activeTab}
                          />
                          <ResponsiveImage
                            tab={tab}
                            tabIndex={index}
                            screenSize="tablet"
                            className="hidden md:block lg:hidden"
                            isActive={index === activeTab}
                          />
                          <ResponsiveImage
                            tab={tab}
                            tabIndex={index}
                            screenSize="mobile"
                            className="block md:hidden"
                            isActive={index === activeTab}
                          />

                          {/* Fallback if no images */}
                          {!getCurrentImage(tab, index, 'desktop') &&
                            !getCurrentImage(tab, index, 'tablet') &&
                            !getCurrentImage(tab, index, 'mobile') && (
                              <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-lg">
                                <p className="text-muted-foreground">No images available</p>
                              </div>
                            )}
                        </div>
                        {/* Tab Description */}
                        {tab.tabDescription && (
                          <div className="p-4 bg-coral-mist/40">
                            {/* Slide Indicators (above description) */}
                            {getImageCount(tab, 'desktop') > 1 && (
                              <div className="flex justify-center gap-2 mb-3">
                                {Array.from({ length: getImageCount(tab, 'desktop') }).map(
                                  (_, slideIndex) => (
                                    <button
                                      key={slideIndex}
                                      aria-label={`Go to slide ${slideIndex + 1}`}
                                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                        (currentSlides[index] || 0) === slideIndex
                                          ? 'bg-purple-bloom'
                                          : 'bg-muted-foreground/40 hover:bg-muted-foreground'
                                      }`}
                                      onClick={() =>
                                        setCurrentSlides((prev) => ({
                                          ...prev,
                                          [index]: slideIndex,
                                        }))
                                      }
                                    />
                                  ),
                                )}
                              </div>
                            )}
                            <p className="text-sm text-coral-pink">{tab.tabDescription}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div className="flex flex-col gap-6">
                {/* Benefits Subheading from active tab */}
                {showcase.demoTabs?.[activeTab]?.benefitsSubheading && (
                  <h4 className="text-lg font-semibold  mb-2">
                    {showcase.demoTabs[activeTab].benefitsSubheading}
                  </h4>
                )}

                {/* Dynamic Benefits based on active tab */}
                {showcase.demoTabs?.[activeTab]?.benefitsList?.map((benefit, index) => {
                  const currentTab = showcase.demoTabs?.[activeTab]
                  const selectedIcon = currentTab?.benefitsIcon as BenefitIcon
                  const IconComponent = selectedIcon ? BENEFIT_ICONS[selectedIcon] : null
                  const iconLabel = selectedIcon ? getIconLabel(selectedIcon) : ''

                  return (
                    <div key={benefit.id || index} className="flex gap-4 items-start">
                      {IconComponent && (
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-secondary">
                          <IconComponent size={24} aria-label={iconLabel} />
                        </div>
                      )}
                      <div className={IconComponent ? '' : 'ml-0'}>
                        <strong className="block text-foreground mb-1 text-base">
                          {benefit.title}
                        </strong>
                        <RichText data={benefit.description} className="text-primary " />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
