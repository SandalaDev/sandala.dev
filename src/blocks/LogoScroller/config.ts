import type { Block } from 'payload'
import { customIconOptions } from '../../constants/scroller-icons'

export const LogoScroller: Block = {
  slug: 'logoScroller',
  interfaceName: 'LogoScrollerBlock',
  labels: {
    plural: 'Logo Scrollers',
    singular: 'Logo Scroller',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Optional title displayed above the logo scroller (e.g., "Technologies & Expertise")',
      },
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      maxRows: 24,
      admin: {
        description: 'Add logos/items to scroll. Minimum 1 required for animation.',
        initCollapsed: true,
      },
      labels: {
        singular: 'Logo/Item',
        plural: 'Logos/Items',
      },
      fields: [
        {
          name: 'logoType',
          type: 'select',
          label: 'Logo Type',
          defaultValue: 'custom',
          options: [
            { label: 'Custom SVG Icon', value: 'custom' },
            { label: 'Font Awesome Icon', value: 'fontawesome' },
          ],
        },
        {
          name: 'customIcon',
          type: 'select',
          label: 'Custom Icon',
          options: customIconOptions,
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.logoType === 'custom',
          },
        },
        {
          name: 'faIconClass',
          type: 'text',
          label: 'Font Awesome Class',
          required: true,
          admin: {
            description: 'e.g., "fab fa-react", "fas fa-database" ',
            condition: (_, siblingData) => siblingData.logoType === 'fontawesome',
          },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name/Label',
          required: true,
          admin: {
            description: 'Display name for this technology/company (always shown below icon/image)',
          },
        },
        {
          name: 'iconColor',
          type: 'select',
          label: 'Icon Color Theme',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Text Color)', value: 'primary' },
            { label: 'Telecom (Blue)', value: 'telecom' },
            { label: 'Design (Pink)', value: 'design' },
            { label: 'Frontend (Cyan)', value: 'frontend' },
            { label: 'Backend (Green)', value: 'backend' },
            { label: 'Database (Amber)', value: 'database' },
            { label: 'Tools (Purple)', value: 'tools' },
            { label: 'Accent (Theme Accent)', value: 'accent' },
          ],
          admin: {
            description: 'Color theme for the icon.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'animationSpeed',
          type: 'select',
          label: 'Animation Speed',
          defaultValue: 'normal',
          options: [
            { label: 'Slow (30s)', value: 'slow' },
            { label: 'Normal (20s)', value: 'normal' },
            { label: 'Fast (15s)', value: 'fast' },
          ],
          admin: {
            description: 'How fast the logos scroll across the screen.',
            width: '50%',
          },
        },
        {
          name: 'pauseOnHover',
          type: 'checkbox',
          label: 'Pause on Hover',
          defaultValue: true,
          admin: {
            description: 'Pause animation when user hovers over the scroller.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Style',
      defaultValue: 'glass',
      options: [
        { label: 'Glass Effect', value: 'glass' },
        { label: 'Transparent', value: 'transparent' },
        { label: 'Theme Background', value: 'theme' },
      ],
      admin: {
        description: 'Background styling for the scroller container.',
      },
    },
  ],
}