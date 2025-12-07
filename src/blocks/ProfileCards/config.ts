import type { Block } from 'payload'
import { defaultLexical } from '../../fields/defaultLexical'

export const ProfileCards: Block = {
  slug: 'profileCards',
  interfaceName: 'ProfileCardsBlock',
  fields: [
    {
      name: 'cards',
      label: 'Profile Cards',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'icon',
          label: 'Icon (Emoji)',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Card Title',
          type: 'text',
          required: true,
        },
        {
          name: 'previewText',
          label: 'Card Preview Text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'hintText',
          label: 'Card Hint Text',
          type: 'text',
          required: true,
          admin: {
            description: 'Italicized helper text at the bottom of the card.',
          },
        },
        {
          name: 'modalContent',
          label: 'Modal Content',
          type: 'richText',
          editor: defaultLexical,
          required: true,
        },
      ],
    },
    {
      name: 'personalSection',
      label: 'Personal Section',
      type: 'group',
      fields: [
        {
          name: 'avatarEmoji',
          label: 'Avatar (Emoji)',
          type: 'text',
          required: true,
          defaultValue: '👋',
        },
        {
          name: 'bioText',
          label: 'Bio Text',
          type: 'richText',
          editor: defaultLexical,
        },
        {
          name: 'ctas',
          label: 'Call-to-Actions',
          type: 'array',
          maxRows: 2,
          fields: [
            {
              name: 'label',
              label: 'Button Label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'Button URL',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
