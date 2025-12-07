import type { Block } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  HeadingFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Choose Your Autonomy Path',
      admin: {
        description: 'Main heading for the pricing section (e.g., "Choose Your Plan")',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue:
        'I build Payload-powered platforms that put you in complete control of your content. No more waiting for developers to make simple updates.',
      admin: {
        description: 'Optional subtitle or description below the main title',
      },
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      defaultValue: [
        {
          badge: 'Best Value',
          title: 'Strategic Entry',
          subtitle: 'Perfect for small businesses ready to go digital',
          currency: '$',
          price: '1,200',
          originalPrice: '2,500',
          priceNote: 'one-time investment',
          features: [
            {
              title: 'Professional Website',
              description: 'Custom design reflecting your brand identity',
            },
            {
              title: 'Content Management System',
              description: 'Easy-to-use CMS for updating your content',
            },
            {
              title: 'Mobile Optimization',
              description: 'Responsive design for all devices',
            },
            {
              title: 'Basic SEO Setup',
              description: 'Search engine optimization foundation',
            },
            {
              title: '3 Months Support',
              description: 'Technical support and minor updates',
            },
          ],
          note: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Ideal for businesses wanting to establish a professional online presence with the flexibility to manage their own content.',
                    },
                  ],
                },
              ],
            },
          },
          featured: true,
          cta: {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Get Started',
              appearance: 'default',
            },
          },
        },
        {
          title: 'Growth Partnership',
          subtitle: 'For businesses ready to scale their digital presence',
          currency: '$',
          price: '4,800',
          priceNote: 'comprehensive solution',
          features: [
            {
              title: 'Everything in Strategic Entry',
              description: 'All features from the previous tier',
            },
            {
              title: 'E-commerce Integration',
              description: 'Full online store with payment processing',
            },
            {
              title: 'Advanced Analytics',
              description: 'Detailed insights into user behavior',
            },
            {
              title: 'API Integration',
              description: 'Connect with your existing tools',
            },
            {
              title: '6 Months Premium Support',
              description: 'Priority support with regular check-ins',
            },
            {
              title: 'Performance Optimization',
              description: 'Speed and conversion optimization',
            },
          ],
          note: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'Perfect for growing businesses that need advanced features and ongoing optimization to maximize their digital ROI.',
                    },
                  ],
                },
              ],
            },
          },
          featured: false,
          cta: {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Scale Up',
              appearance: 'outline',
            },
          },
        },
        {
          title: 'Custom Platform',
          subtitle: 'Enterprise-level solutions tailored to your needs',
          currency: '$',
          price: '8,500',
          priceNote: 'starting price',
          features: [
            {
              title: 'Everything in Growth Partnership',
              description: 'All previous features included',
            },
            {
              title: 'Custom Development',
              description: 'Bespoke features built for your workflow',
            },
            {
              title: 'Multi-site Management',
              description: 'Manage multiple websites from one dashboard',
            },
            {
              title: 'Advanced Integrations',
              description: 'Complex third-party system connections',
            },
            {
              title: 'Dedicated Project Manager',
              description: 'Personal point of contact throughout',
            },
            {
              title: '12 Months Enterprise Support',
              description: 'White-glove support with SLA guarantees',
            },
          ],
          note: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'For established businesses requiring sophisticated digital infrastructure with enterprise-grade reliability and support.',
                    },
                  ],
                },
              ],
            },
          },
          featured: false,
          cta: {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'Discuss Project',
              appearance: 'default',
            },
          },
        },
      ],
      admin: {
        description: 'Pricing cards - typically 2-4 cards work best',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'badge',
          type: 'text',
          admin: {
            description: 'Optional badge text (e.g., "Best Value", "Popular", "Most Popular")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Plan name (e.g., "Basic", "Pro", "Enterprise")',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'Short description of the plan',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'currency',
              type: 'text',
              defaultValue: '$',
              admin: {
                width: '20%',
                description: 'Currency symbol',
              },
            },
            {
              name: 'price',
              type: 'text',
              required: true,
              admin: {
                width: '40%',
                description: 'Main price (e.g., "99", "1,200")',
              },
            },
            {
              name: 'originalPrice',
              type: 'text',
              admin: {
                width: '40%',
                description: 'Optional original price for strikethrough effect',
              },
            },
          ],
        },
        {
          name: 'priceNote',
          type: 'text',
          admin: {
            description: 'Optional note below price (e.g., "per month", "one-time")',
          },
        },
        {
          name: 'features',
          type: 'array',
          minRows: 1,
          admin: {
            description: 'List of features included in this plan',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Feature name/title (bold text)',
              },
            },
            {
              name: 'description',
              type: 'text',
              admin: {
                description: 'Optional feature description (smaller text below title)',
              },
            },
          ],
        },
        {
          name: 'note',
          type: 'richText',
          admin: {
            description: 'Optional note or additional info for this plan',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              FixedToolbarFeature(),
              BoldFeature(),
              ItalicFeature(),
              HeadingFeature({ enabledHeadingSizes: ['h4', 'h5'] }),
            ],
          }),
          hooks: {
            beforeValidate: [
              ({ value }) => {
                // Convert legacy string data to richtext format
                if (typeof value === 'string' && value.length > 0) {
                  return {
                    root: {
                      type: 'root',
                      children: [
                        {
                          type: 'paragraph',
                          children: [
                            {
                              type: 'text',
                              text: value,
                            },
                          ],
                        },
                      ],
                    },
                  }
                }
                // Also handle cases where value is null, undefined, or empty
                if (!value || (typeof value === 'object' && !value.root)) {
                  return null
                }
                return value
              },
            ],
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Make this card stand out (adds border and scale effect)',
          },
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'cta',
            label: 'Call to Action Button',
            admin: {
              description: 'Button for this pricing card',
            },
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Pricing Blocks',
    singular: 'Pricing Block',
  },
}
