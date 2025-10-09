import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

export const LowImpactHero: React.FC<Page['hero']> = ({ headline, subhead }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {headline && <RichText className="mb-4" data={headline} enableGutter={false} />}
        {subhead && <RichText data={subhead} enableGutter={false} />}
      </div>
    </div>
  )
}
