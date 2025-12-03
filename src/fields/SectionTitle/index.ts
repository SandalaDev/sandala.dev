import type { Field } from 'payload'

export const SectionTitle: Field = {
  name: 'sectionTitle',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'width',
      type: 'number',
      defaultValue: 100,
      min: 0,
      max: 100,
    },
  ],
}
