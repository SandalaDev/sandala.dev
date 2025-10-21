'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRocket,
  faCode,
  faCogs,
  faLightbulb,
  faPalette,
  faPenNib,
  faNetworkWired,
  faLayerGroup,
  faPlug,
  faChartLine,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons'

type OrbitalCardsBlockProps = {
  cards?: Array<{
    icon: string
    title: string
    description: string
  }>
}

const iconMap = {
  rocket: faRocket,
  code: faCode,
  cogs: faCogs,
  lightbulb: faLightbulb,
  palette: faPalette,
  penTool: faPenNib,
  network: faNetworkWired,
  layers: faLayerGroup,
  plug: faPlug,
  chartLine: faChartLine,
  handshake: faHandshake,
}

export const OrbitalCardsBlock: React.FC<OrbitalCardsBlockProps> = ({ cards }) => {
  // Safety check - if no cards, don't render
  if (!cards || !Array.isArray(cards) || cards.length === 0) {
    return null
  }

  return (
    <div className="relative  container">
      {/* Desktop Orbital Layout */}
      <div className="hidden lg:block relative h-[60vh]">
        {/* Central Hub (masked) + Circular Text Ring */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <div
            className="relative"
            style={{ width: 'clamp(12rem, 28vw, 20rem)', height: 'clamp(12rem, 28vw, 20rem)' }}
          >
            {/* Masked hub */}
            <div
              className="absolute inset-0 bg-card/15 backdrop-blur-[30px] border border-secondary/30 flex items-center justify-center shadow-2xl pointer-events-none z-20 animate-spin"
              style={{
                WebkitMaskImage: "url('/icons/flow.svg')",
                maskImage: "url('/icons/flow.svg')",
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                animationDuration: '20s',
              }}
            >
              <svg
                className="pointer-events-none absolute inset-0"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="innerRingPath"
                    d="M50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0"
                    fill="none"
                  />
                </defs>
                <text
                  className="font-heading uppercase tracking-[0.12em] text-[6px] md:text-[7px] lg:text-[9px]"
                  fill="currentColor"
                  style={{ filter: 'drop-shadow(2px 2px 4px rgba(110, 80, 138, 0.8))' }}
                >
                  <textPath xlinkHref="#innerRingPath" startOffset="0%" className="text-coral-pink">
                    Capabilities &#160; Services &#160; Deliverables &#160;
                  </textPath>
                </text>
              </svg>

              {/* Removed center icon as requested */}
            </div>
          </div>
        </div>

        {/* Orbital Cards */}
        {cards.map((card, index) => {
          // Safety check for individual card data
          if (!card || !card.icon || !card.title || !card.description) {
            return null
          }

          const icon = iconMap[card.icon as keyof typeof iconMap]
          const positions = [
            'top-20 left-1/2 -translate-x-1/2',
            'top-32 right-32',
            'top-1/2 right-20 -translate-y-1/2',
            'bottom-32 right-32',
            'bottom-20 left-1/2 -translate-x-1/2',
            'bottom-32 left-32',
            'top-1/2 left-20 -translate-y-1/2',
            'top-32 left-32',
          ]

          return (
            <div
              key={index}
              className={`absolute w-[50ch] min-h-[28ch] p-3 bg-card/8 backdrop-blur-[25px] rounded-[2rem] border border-secondary/30 transition-all duration-400 cursor-pointer shadow-lg hover:transform hover:-translate-y-2 hover:scale-105 hover:bg-card/12 hover:border-coral-bright/40 hover:shadow-2xl z-10 hover:z-50 focus-within:z-50 ${positions[index] || positions[0]}`}
              style={{
                animationDelay: `${(index + 1) * 0.1}s`,
                opacity: 0,
                animation: 'fadeInUp 0.8s ease forwards',
              }}
            >
              <div className="relative">
                <div className="min-h-[24ch] absolute inset-0 bg-gradient-to-br from-coral-whisper/10 to-purple-bloom/5 rounded-2xl -z-1" />
                {icon && (
                  <FontAwesomeIcon icon={icon} className="w-8 h-8 mb-4 text-accent-foreground" />
                )}
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="font-sans font-light text-sm text-purple-shadow leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile Grid Layout */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => {
          // Safety check for individual card data
          if (!card || !card.icon || !card.title || !card.description) {
            return null
          }

          const icon = iconMap[card.icon as keyof typeof iconMap]

          return (
            <div
              key={index}
              className="p-6 bg-card/8 backdrop-blur-[25px] rounded-2xl border border-coral-pink/20 transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-card/12 hover:border-coral-bright/40 hover:shadow-xl"
              style={{
                animationDelay: `${(index + 1) * 0.1}s`,
                opacity: 0,
                animation: 'fadeInUp 0.8s ease forwards',
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-coral-whisper/10 to-purple-bloom/5 rounded-2xl -z-1" />
                {icon && <FontAwesomeIcon icon={icon} className="w-8 h-8 mb-4 text-primary" />}
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="font-sans font-light text-sm text-purple-shadow leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
