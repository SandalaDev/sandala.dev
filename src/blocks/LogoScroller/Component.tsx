'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import { CUSTOM_ICONS, type CustomIconKey } from '@/constants/scroller-icons'

// Local type definition to match the new config
type LogoScrollerBlockProps = {
  title?: string | null
  logos?: Array<{
    logoType?: 'custom' | 'fontawesome' | null
    customIcon?: CustomIconKey | null
    faIconClass?: string | null
    name?: string | null
    iconColor?:
      | 'primary'
      | 'telecom'
      | 'design'
      | 'frontend'
      | 'backend'
      | 'database'
      | 'tools'
      | 'accent'
      | null
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

  // Color classes for icons
  const getIconColorClass = (colorTheme: string | null | undefined) => {
    switch (colorTheme) {
      case 'telecom':
        return 'text-[#4f46e5]'
      case 'design':
        return 'text-[#ec4899]'
      case 'frontend':
        return 'text-[#06b6d4]'
      case 'backend':
        return 'text-[#10b981]'
      case 'database':
        return 'text-[#f59e0b]'
      case 'tools':
        return 'text-[#8b5cf6]'
      case 'accent':
        return 'text-accent'
      default:
        return 'text-primary'
    }
  }

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

  // Create duplicate set for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="container py-12 md:py-16">
      {title && (
        <h2 className="text-2xl font-semibold text-center mb-12 text-primary">{title}</h2>
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

            const IconComponent =
              logo.logoType === 'custom' && logo.customIcon ? CUSTOM_ICONS[logo.customIcon] : null
            const colorClass = getIconColorClass(logo.iconColor)

            return (
              <div
                key={index}
                className={cn(
                  'flex flex-col items-center min-w-[120px] transition-all duration-300 hover:transform hover:-translate-y-2',
                )}
              >
                {/* Icon/Image/Text Display */}
                <div className="mb-4 flex items-center justify-center h-16 w-16 md:h-20 md:w-20">
                  {logo.logoType === 'custom' && IconComponent ? (
                    <IconComponent
                      className={cn('w-12 h-12 md:w-14 md:h-14 transition-all duration-300', colorClass)}
                    />
                  ) : logo.logoType === 'fontawesome' && logo.faIconClass ? (
                    <i
                      className={cn(
                        logo.faIconClass,
                        'text-4xl md:text-5xl transition-all duration-300',
                        colorClass,
                      )}
                    />
                  ) : (
                    <div className="text-3xl md:text-4xl font-bold text-primary flex items-center justify-center w-full h-full">
                      {logo.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Name/Label */}
                <div className="text-sm md:text-base font-semibold text-primary text-center leading-tight">
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
