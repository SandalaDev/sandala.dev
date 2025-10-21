import type { Block } from 'payload'

export const OrbitalCards: Block = {
  slug: 'orbitalCards',
  interfaceName: 'OrbitalCardsBlock',
  fields: [
    {
      name: 'cards',
      type: 'array',
      minRows: 3,
      maxRows: 8,
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          options: [
            { label: 'Rocket', value: 'rocket' },
            { label: 'Code', value: 'code' },
            { label: 'Cogs', value: 'cogs' },
            { label: 'Lightbulb', value: 'lightbulb' },
            { label: 'Palette', value: 'palette' },
            { label: 'Pen Tool', value: 'penTool' },
            { label: 'Network', value: 'network' },
            { label: 'Layers', value: 'layers' },
            { label: 'Plug', value: 'plug' },
            { label: 'Chart Line', value: 'chartLine' },
            { label: 'Handshake', value: 'handshake' },
          ],
          required: true,
          admin: {
            description: 'Choose an icon for this card',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Card Title',
          maxLength: 50,
          required: true,
          admin: {
            description: 'Keep under 5 words',
          },
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          maxLength: 340,
          required: true,
          admin: {
            description: '1-2 short sentences',
          },
        },
      ],
      admin: {
        description: 'Add 3-8 capability cards',
      },
    },
  ],
  labels: {
    plural: 'Orbital Cards',
    singular: 'Orbital Cards',
  },
}
