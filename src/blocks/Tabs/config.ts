import type { Block } from 'payload'

export const Tabs: Block = {
  slug: 'tabs',
  labels: {
    singular: 'Tabs',
    plural: 'Tabs',
  },
  interfaceName: 'TabsBlock',
  fields: [
    {
      name: 'showcase',
      label: 'Interactive Showcase',
      type: 'group',
      admin: {
        description: 'Configure the main interactive demo section with tabs and slideshows.',
      },
      fields: [
        {
          name: 'showcaseHeading',
          label: 'Showcase Heading',
          type: 'text',
          required: true,
          defaultValue: 'The Power of Composability',
          admin: {
            description: 'Main heading for the interactive showcase section.',
          },
        },
        {
          name: 'showcaseSubheading',
          label: 'Showcase Subheading',
          type: 'text',
          required: true,
          defaultValue: 'Build once, reconfigure forever. Your app adapts as your business grows.',
          admin: {
            description: 'Subheading providing context for the showcase.',
          },
        },
        {
          name: 'slideshowSpeed',
          label: 'Slideshow Speed (seconds)',
          type: 'number',
          defaultValue: 4,
          min: 2,
          max: 10,
          admin: {
            description: 'How many seconds each slide should display before auto-advancing.',
          },
        },
        {
          name: 'demoTabs',
          label: 'Demo Tabs',
          type: 'array',
          minRows: 1,
          maxRows: 4,
          labels: {
            singular: 'Demo Tab',
            plural: 'Demo Tabs',
          },
          admin: {
            description:
              'Configure tabs with slideshow mockups. Each tab represents a different aspect of your platform.',
          },
          fields: [
            {
              name: 'tabName',
              label: 'Tab Name',
              type: 'text',
              required: true,
              admin: {
                description: 'Text displayed on the tab button (e.g., "Frontend", "Admin Panel").',
              },
            },
            {
              name: 'tabDescription',
              label: 'Tab Description',
              type: 'textarea',
              admin: {
                description:
                  'Optional description text displayed below the slideshow for this tab.',
              },
            },
            {
              name: 'desktopImages',
              label: 'Desktop Slideshow Images',
              type: 'array',
              minRows: 1,
              labels: {
                singular: 'Desktop Image',
                plural: 'Desktop Images',
              },
              admin: {
                description:
                  'Images for desktop/large screens. Recommended size: 1200x800px or similar 3:2 ratio.',
              },
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'altText', label: 'Alt Text', type: 'text', required: true },
              ],
            },
            {
              name: 'tabletImages',
              label: 'Tablet Slideshow Images',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Tablet Image', plural: 'Tablet Images' },
              admin: {
                description:
                  'Images for tablet/medium screens. Recommended size: 768x600px or similar 4:3 ratio.',
              },
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'altText', label: 'Alt Text', type: 'text', required: true },
              ],
            },
            {
              name: 'mobileImages',
              label: 'Mobile Slideshow Images',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Mobile Image', plural: 'Mobile Images' },
              admin: {
                description:
                  'Images for mobile/small screens. Recommended size: 375x500px or similar portrait ratio.',
              },
              fields: [
                {
                  name: 'image',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                { name: 'altText', label: 'Alt Text', type: 'text', required: true },
              ],
            },
            {
              name: 'benefitsSubheading',
              label: 'Benefits Subheading',
              type: 'text',
              admin: { description: 'Subheading displayed above the benefits list for this tab.' },
            },
            {
              name: 'benefitsIcon',
              label: 'Benefits List Icon',
              type: 'select',
              options: [
                { label: 'Payload CMS', value: 'payload' },
                { label: 'Open Source', value: 'openSource' },
                { label: 'Ownership', value: 'ownership' },
              ],
              admin: {
                description: 'Select an icon to use as bullet points for all benefits in this tab.',
              },
            },
            {
              name: 'benefitsList',
              label: 'Benefits List',
              type: 'array',
              minRows: 1,
              labels: { singular: 'Benefit Item', plural: 'Benefit Items' },
              admin: { description: 'Benefits displayed when this tab is active.' },
              fields: [
                { name: 'title', label: 'Benefit Title', type: 'text', required: true },
                {
                  name: 'description',
                  label: 'Benefit Description',
                  type: 'richText',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
