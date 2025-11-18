import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { ICON_METADATA } from '@/constants/icons'

export const ContactHub: Block = {
  slug: 'contactHub',
  interfaceName: 'ContactHubBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'contactCards',
      type: 'array',
      label: 'Contact Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'Card ID',
          required: true,
          admin: {
            description: 'Unique identifier for this card (used for modal targeting)',
          },
        },
        {
          name: 'topIcon',
          type: 'select',
          label: 'Top Icon',
          options: Object.entries(ICON_METADATA.contact).map(([key, data]) => ({
            label: data.label,
            value: key,
          })),
        },
        {
          name: 'bottomIcon',
          type: 'select',
          label: 'Bottom Icon ',
          options: [
            { label: 'Message Circle', value: 'message-circle' },
            { label: 'Quote Left', value: 'quote-left' },
            { label: 'Rocket', value: 'rocket' },
          ],
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Card Subtitle',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Card Description',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
        {
          name: 'note',
          type: 'richText',
          label: 'Card Note/Badge',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          admin: {
            description: 'Optional note or badge text (e.g., "Quick response", "Paid session")',
          },
        },
        {
          name: 'form',
          type: 'relationship',
          label: 'Contact Form',
          relationTo: 'forms',
          required: true,
          admin: {
            description: 'Select the form to display in the modal for this contact card',
          },
        },
        {
          name: 'crossLinks',
          type: 'array',
          label: 'Cross Links',
          maxRows: 3,
          admin: {
            description: 'Links to suggest other contact options within the modal',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Link Text',
              required: true,
              admin: {
                description: 'Text before the link (e.g., "Sounds like you need a demo?")',
              },
            },
            {
              name: 'linkText',
              type: 'text',
              label: 'Link Label',
              required: true,
              admin: {
                description: 'The clickable link text (e.g., "Click here for demo")',
              },
            },
            {
              name: 'targetCardId',
              type: 'text',
              label: 'Target Card ID',
              required: true,
              admin: {
                description: 'The ID of the card to open when this link is clicked',
              },
            },
          ],
        },
      ],
    },
  ],
}
