'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { CUSTOM_ICONS, type CustomIconKey } from '@/constants/scroller-icons'

type LogoScrollerBlockProps = {
  title?: string | null
  logos?: Array<{
    customIcon?: CustomIconKey | null
    name?: string | null
  }> | null
  animationSpeed?: 'slow' | 'normal' | 'fast' | null
  pauseOnHover?: boolean | null
  backgroundColor?: 'glass' | 'transparent' | 'theme' | null
}

export const LogoScrollerBlock: React.FC<LogoScrollerBlockProps> = ({
  title,
  logos,
  animationSpeed = 'normal',
  pauseOnHover = true,
  backgroundColor = 'glass',
}) => {
  if (!logos || logos.length === 0) return null

  // Animation duration based on speed
  const animationDuration = {
    slow: '30s',
    normal: '20s',
    fast: '15s',
  }[animationSpeed || 'normal']

  // Background container classes
  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case 'glass':
        return 'glass backdrop-blur-[20px] border border-white/25'
      case 'theme':
        return 'bg-background/50'
      default:
        return 'bg-transparent'
    }
  }

  // Duplicate for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="container py-12 md:py-16">
      {title && (
        <h2 className="text-2xl font-semibold text-center mb-12 text-primary dark:text-secondary">
          {title}
        </h2>
      )}

      <div
        className={cn(
          'rounded-3xl p-6 md:p-12 overflow-hidden relative',
          getBackgroundClass(),
          '[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        )}
      >
        <div
          className={cn(
            'flex flex-nowrap gap-8 md:gap-12 items-center',
            pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
          )}
          style={{
            animation: `logoScroll ${animationDuration} linear infinite`,
          }}
        >
          {duplicatedLogos.map((logo, index) => {
            if (!logo || !logo.name) return null

            const IconComponent = logo.customIcon ? CUSTOM_ICONS[logo.customIcon] : null

            return (
              <div
                key={index}
                className={cn(
                  'flex flex-col items-center min-w-[120px] transition-all duration-300 hover:transform hover:-translate-y-2',
                )}
              >
                {/* Icon */}
                <div className="mb-4 flex items-center justify-center h-16 w-16 md:h-20 md:w-20">
                  {IconComponent ? (
                    <IconComponent className="w-12 h-12 md:w-14 md:h-14 text-primary dark:text-primary transition-all duration-300" />
                  ) : (
                    <div className="text-3xl md:text-4xl font-bold text-primary dark:text-secondary flex items-center justify-center w-full h-full">
                      {logo.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="text-sm md:text-base font-semibold text-center leading-tight">
                  {logo.name}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes logoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
