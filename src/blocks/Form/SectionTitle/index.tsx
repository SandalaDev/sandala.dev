import React from 'react'
import { Width } from '../Width'
import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'

export const SectionTitle: React.FC<
  FormFieldBlock & {
    title?: string
    width?: number | string

    register?: any
    errors?: any
  }
> = ({ title, width }) => {
  return (
    <Width width={width}>
      <div className="section-title-wrapper">
        <h3 className="text-xl font-semibold text-coral-pink mt-8 mb-4">{title}</h3>
        <div className="h-px bg-coral-bright opacity-30 mb-6" />
      </div>
    </Width>
  )
}
