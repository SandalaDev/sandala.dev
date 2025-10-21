import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProcessCards: Block = {
  slug: 'processCards',
  interfaceName: 'ProcessCardsBlock',
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Three paths in, one straight line to a live product.',
      maxLength: 60,
      required: true,
      admin: {
        description: 'Short tagline above the main heading',
      },
    },
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Section Heading',
      required: true,
      admin: {
        description: 'Main heading for the process section',
      },
    },
    {
      name: 'steps',
      type: 'array',
      minRows: 3,
      maxRows: 5,
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          label: 'Step #',
          min: 1,
          max: 5,
          required: true,
          admin: {
            description: 'Step number (1-5)',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Step Title',
          maxLength: 25,
          required: true,
          admin: {
            description: 'Short, descriptive title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Details',
          maxLength: 200,
          required: true,
          admin: {
            description: 'Detailed explanation of the step',
          },
        },
      ],
      admin: {
        description: 'Add 3-5 process steps',
      },
    },
  ],
  labels: {
    plural: 'Process Cards',
    singular: 'Process Cards',
  },
}
