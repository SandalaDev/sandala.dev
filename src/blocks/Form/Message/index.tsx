import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const Message: React.FC<{ message: DefaultTypedEditorState }> = ({ message }) => {
  return (
    <Width
      className="my-2 py-8 text-coral-pink rounded-3xl bg-purple-shadow/60 backdrop-blur-xl"
      width="100"
    >
      {message && <RichText data={message} enableProse={false} />}
    </Width>
  )
}
