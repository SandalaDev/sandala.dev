import type { Block } from 'payload/dist/types/index'

export const Table: Block = {
  slug: 'table',
  labels: {
    singular: 'Table',
    plural: 'Tables',
  },
  interfaceName: 'TableBlock',
  fields: [
    // Comparison Table Section
    {
      name: 'comparisonSection',
      label: 'Comparison Table',
      type: 'group',
      admin: {
        description: 'Configure the platform comparison table section.',
      },
      fields: [
        {
          name: 'tableHeading',
          label: 'Table Heading',
          type: 'text',
          defaultValue: 'The Payload Advantage.',
          required: true,
        },
        {
          name: 'tableSubheading',
          label: 'Table Subheading',
          type: 'text',
          admin: {
            description: 'Optional subheading below the main heading.',
          },
        },
        // Feature Rows (5 predefined features)
        {
          name: 'flexibilityFeature',
          label: 'Flexibility Feature',
          type: 'group',
          admin: {
            description: 'Flexibility comparison across platforms.',
          },
          fields: [
            {
              name: 'payloadText',
              label: 'Payload Description',
              type: 'textarea',
              defaultValue:
                'Full application framework — build anything from course platforms to inventory systems to social networks',
              admin: {
                description: 'Description for Payload CMS.',
              },
            },
            {
              name: 'wordpressText',
              label: 'WordPress Description',
              type: 'textarea',
              defaultValue: 'Great for blogs and basic sites, but becomes messy for complex apps',
              admin: {
                description: 'Description for WordPress.',
              },
            },
            {
              name: 'shopifyText',
              label: 'Shopify Description',
              type: 'textarea',
              defaultValue: 'E-commerce focused — difficult to build non-shopping experiences',
              admin: {
                description: 'Description for Shopify.',
              },
            },
            {
              name: 'squarespaceText',
              label: 'Squarespace/Wix Description',
              type: 'textarea',
              defaultValue: "Websites only — can't build custom apps or user dashboards",
              admin: {
                description: 'Description for Squarespace/Wix.',
              },
            },
          ],
        },
        {
          name: 'customizationFeature',
          label: 'Customization Feature',
          type: 'group',
          admin: {
            description: 'Customization comparison across platforms.',
          },
          fields: [
            {
              name: 'payloadText',
              label: 'Payload Description',
              type: 'textarea',
              defaultValue:
                'Unlimited — custom user roles, workflows, dashboards, integrations, business logic',
              admin: {
                description: 'Description for Payload CMS.',
              },
            },
            {
              name: 'wordpressText',
              label: 'WordPress Description',
              type: 'textarea',
              defaultValue: "Plugins help, but you're limited by what exists or gets complex fast",
              admin: {
                description: 'Description for WordPress.',
              },
            },
            {
              name: 'shopifyText',
              label: 'Shopify Description',
              type: 'textarea',
              defaultValue:
                "Apps extend it, but you're stuck within Shopify's e-commerce framework",
              admin: {
                description: 'Description for Shopify.',
              },
            },
            {
              name: 'squarespaceText',
              label: 'Squarespace/Wix Description',
              type: 'textarea',
              defaultValue: 'Templates and basic customization only — no custom functionality',
              admin: {
                description: 'Description for Squarespace/Wix.',
              },
            },
          ],
        },
        {
          name: 'ownershipFeature',
          label: 'Ownership & Control Feature',
          type: 'group',
          admin: {
            description: 'Ownership & Control comparison across platforms.',
          },
          fields: [
            {
              name: 'payloadText',
              label: 'Payload Description',
              type: 'textarea',
              defaultValue:
                'Complete ownership — host anywhere, modify anything, no vendor lock-in',
              admin: {
                description: 'Description for Payload CMS.',
              },
            },
            {
              name: 'wordpressText',
              label: 'WordPress Description',
              type: 'textarea',
              defaultValue: 'You own it, but hosting and maintenance can get complex',
              admin: {
                description: 'Description for WordPress.',
              },
            },
            {
              name: 'shopifyText',
              label: 'Shopify Description',
              type: 'textarea',
              defaultValue: 'Hosted service — your business depends on their platform',
              admin: {
                description: 'Description for Shopify.',
              },
            },
            {
              name: 'squarespaceText',
              label: 'Squarespace/Wix Description',
              type: 'textarea',
              defaultValue: "Hosted service — you're renting, not owning",
              admin: {
                description: 'Description for Squarespace/Wix.',
              },
            },
          ],
        },
        {
          name: 'scalabilityFeature',
          label: 'Long-term Scalability Feature',
          type: 'group',
          admin: {
            description: 'Long-term Scalability comparison across platforms.',
          },
          fields: [
            {
              name: 'payloadText',
              label: 'Payload Description',
              type: 'textarea',
              defaultValue:
                'Scales from startup to enterprise — no platform limitations, just outgrow',
              admin: {
                description: 'Description for Payload CMS.',
              },
            },
            {
              name: 'wordpressText',
              label: 'WordPress Description',
              type: 'textarea',
              defaultValue: 'Can scale, but performance issues with complex sites',
              admin: {
                description: 'Description for WordPress.',
              },
            },
            {
              name: 'shopifyText',
              label: 'Shopify Description',
              type: 'textarea',
              defaultValue: 'Scales for e-commerce, but locked into their ecosystem',
              admin: {
                description: 'Description for Shopify.',
              },
            },
            {
              name: 'squarespaceText',
              label: 'Squarespace/Wix Description',
              type: 'textarea',
              defaultValue: 'Limited by plan tiers — may need to rebuild as you grow',
              admin: {
                description: 'Description for Squarespace/Wix.',
              },
            },
          ],
        },
        {
          name: 'dx_Feature',
          label: 'Developer Experience Feature',
          type: 'group',
          admin: {
            description: 'Developer Experience comparison across platforms.',
          },
          fields: [
            {
              name: 'payload',
              label: 'Payload Description',
              type: 'textarea',
              defaultValue:
                'Modern tech stack, built for developers — easy to maintain and expand over time',
              admin: {
                description: 'Description for Payload CMS.',
              },
            },
            {
              name: 'wordpress',
              label: 'WordPress Description',
              type: 'textarea',
              defaultValue: 'Legacy PHP codebase — can become maintenance nightmare',
              admin: {
                description: 'Description for WordPress.',
              },
            },
            {
              name: 'shopify',
              label: 'Shopify Description',
              type: 'textarea',
              defaultValue: 'Decent developer tools, but limited to e-commerce use cases',
              admin: {
                description: 'Description for Shopify.',
              },
            },
            {
              name: 'squarespace',
              label: 'Squarespace/Wix Description',
              type: 'textarea',
              defaultValue: "No code access — developers can't help beyond basic styling",
              admin: {
                description: 'Description for Squarespace/Wix.',
              },
            },
          ],
        },
      ],
    },
  ],
}
