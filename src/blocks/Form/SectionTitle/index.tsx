import React from 'react'
import { Width } from '../Width'
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const SectionTitle: React.FC<
  FormFieldBlock & {
    title?: string
    width?: number | string
  }
> = ({ title, width }) => {
  return (
    <div className="mt-16">
      <Width width={width}>
        <div className="">
          <h3 className="text-xl font-semibold text-coral-pink mt-8 mb-2">{title}</h3>
          <div className="h-px bg-coral-bright opacity-80 mb-0" />
        </div>
      </Width>
    </div>
  )
}
