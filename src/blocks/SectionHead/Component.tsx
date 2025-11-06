'use client'

import React from 'react'
import RichText from '@/components/RichText'

type SectionHeadBlockProps = {
  richText: any
  anchorId?: string
}

export const SectionHeadBlock: React.FC<SectionHeadBlockProps> = ({ richText, anchorId }) => {
  if (!richText) return null

  return (
    <div id={anchorId || undefined} className="container glass">
      <div className="text-end mb-4">
        <RichText data={richText} className="mb-0" />
      </div>
    </div>
  )
}
