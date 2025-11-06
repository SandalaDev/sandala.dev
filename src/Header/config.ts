import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'anchor',
      type: 'text',
      label: 'Anchor (optional)',
      admin: {
        description: 'Add an optional anchor ID to link to a section, e.g. "about" or "contact".',
        condition: (_, siblingData) => siblingData?.type === 'reference', // only show when linking internally
        width: '50%',
      },
      validate: (val: unknown) => {
        if (typeof val === 'string' && val.length > 0 && !/^[a-zA-Z0-9\-_]+$/.test(val)) {
          return 'Anchor can only contain letters, numbers, dashes, or underscores.'
        }
        return true
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
