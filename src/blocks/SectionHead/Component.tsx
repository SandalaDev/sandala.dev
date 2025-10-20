'use client'

import React, { Fragment } from 'react'
import RichText from '@/components/RichText'

type SectionHeadBlockProps = {
  richText: any
}

export const SectionHeadBlock: React.FC<SectionHeadBlockProps> = ({ richText }) => {
  if (!richText) {
    return null
  }

  return (
    <div className="container glass">
      <div className=" text-end mb-4">
        <RichText data={richText} className=" mb-0" />
      </div>
    </div>
  )
}
