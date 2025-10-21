import type { Block } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

export const TextCards: Block = {
  slug: 'textCards',
  interfaceName: 'TextCardsBlock',
  labels: {
    plural: 'Text Cards',
    singular: 'Text Card Block',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      admin: {
        description: 'Add reusable text cards. Optional fields are not rendered when empty.',
        initCollapsed: true,
      },
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: {
            description: 'Short headline for the card (e.g., “Brand Foundation”)',
          },
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Body (Rich Text)',
          admin: {
            description: 'Main body text. Supports bold/italic and headings.',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              BoldFeature(),
              ItalicFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
            ],
          }),
        },
        {
          type: 'row',
          fields: [
            {
              name: 'listStyle',
              type: 'select',
              label: 'List Style',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Bullets', value: 'bullet' },
                { label: 'Checkmarks', value: 'check' },
              ],
              admin: {
                description: 'Choose how list items should render (separate from rich text).',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'bodyList',
          type: 'array',
          label: 'Body List Items',
          admin: {
            description: 'Optional list items rendered below the body (uses chosen list style).',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              admin: { description: 'One short line per item' },
            },
          ],
        },
        {
          name: 'footnote',
          type: 'text',
          label: 'Footnote (Plain Text)',
          admin: {
            description: 'Rendered in italic styling by the component.',
          },
        },
      ],
    },
  ],
}
