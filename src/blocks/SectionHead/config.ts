import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const SectionHead: Block = {
  slug: 'sectionHead',
  interfaceName: 'SectionHeadBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      admin: {
        description:
          'Optional. Add an ID so this section can be linked (e.g. “about”, “contact”, “features”).',
      },
    },
  ],
  labels: {
    plural: 'Section Headers',
    singular: 'Section Header',
  },
}
