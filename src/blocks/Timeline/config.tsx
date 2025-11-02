import type { Block } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// Reusable lexical editor configurations
const basicLexicalConfig = () =>
  lexicalEditor({
    features: () => [FixedToolbarFeature(), InlineToolbarFeature(), BoldFeature(), ItalicFeature()],
  })

const headingLexicalConfig = (
  headingSizes: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')[] = ['h4', 'h5', 'h6'],
) =>
  lexicalEditor({
    features: () => [
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      BoldFeature(),
      ItalicFeature(),
      HeadingFeature({ enabledHeadingSizes: headingSizes }),
    ],
  })

// Reusable tags field configuration
const createTagsField = (condition?: any) => ({
  name: 'tags',
  type: 'array' as const,
  label: 'Skills/Tags',
  admin: {
    ...(condition && { condition }),
    description: 'Skills, technologies, or relevant tags',
  },
  fields: [
    {
      name: 'tag',
      type: 'text' as const,
      required: true,
    },
  ],
})

// Reusable role fields for timeline items
const createRoleFields = () => [
  {
    name: 'isDual',
    type: 'checkbox' as const,
    label: 'Dual Role Item',
    defaultValue: false,
    admin: {
      description: 'Check if this item represents multiple concurrent roles/activities',
    },
  },
  {
    type: 'row' as const,
    fields: [
      {
        name: 'role',
        type: 'text' as const,
        label: 'Role/Title',
        admin: {
          condition: (data: any, siblingData: any) => !siblingData?.isDual,
          description: 'Job title or role name',
          width: '50%',
        },
      },
      {
        name: 'company',
        type: 'text' as const,
        label: 'Company/Organization',
        admin: {
          condition: (data: any, siblingData: any) => !siblingData?.isDual,
          description: 'Company, organization, or project name',
          width: '50%',
        },
      },
    ],
  },
  {
    name: 'description',
    type: 'richText' as const,
    label: 'Description',
    admin: {
      condition: (data: any, siblingData: any) => !siblingData?.isDual,
      description: 'Detailed description of accomplishments and responsibilities',
    },
    editor: headingLexicalConfig(),
  },
  createTagsField((data: any, siblingData: any) => !siblingData?.isDual),
  {
    name: 'roles',
    type: 'array' as const,
    label: 'Concurrent Roles',
    minRows: 2,
    maxRows: 3,
    admin: {
      condition: (data: any, siblingData: any) => siblingData?.isDual,
      description: 'Multiple roles or activities during this period',
    },
    fields: [
      {
        name: 'role',
        type: 'text' as const,
        label: 'Role/Title',
        required: true,
      },
      {
        name: 'company',
        type: 'text' as const,
        label: 'Company/Organization',
        required: true,
      },
      {
        name: 'description',
        type: 'richText' as const,
        label: 'Description',
        editor: basicLexicalConfig(),
      },
      createTagsField(),
    ],
  },
  {
    name: 'period',
    type: 'text' as const,
    label: 'Time Period',
    required: true,
    admin: {
      description: 'Date range or period (e.g., "2020 — 2023", "Jan 2024")',
    },
  },
]

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    plural: 'Timeline Blocks',
    singular: 'Timeline Block',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Timeline Title',
      admin: {
        description: 'Main title for the timeline (e.g., "Career Journey", "Project History")',
      },
    },
    {
      name: 'subtitle',
      type: 'richText',
      label: 'Subtitle/Description',
      admin: {
        description: 'Optional subtitle or description text',
      },
      editor: basicLexicalConfig(),
    },
    {
      name: 'foundation',
      type: 'group',
      label: 'Foundation (Epoch 1)',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Foundation Items',
          minRows: 1,
          labels: {
            singular: 'Timeline Item',
            plural: 'Timeline Items',
          },
          fields: createRoleFields(),
        },
      ],
    },
    {
      name: 'convergence',
      type: 'group',
      label: 'Convergence (Epoch 2)',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Convergence Items',
          minRows: 1,
          labels: {
            singular: 'Timeline Item',
            plural: 'Timeline Items',
          },
          fields: createRoleFields(),
        },
      ],
    },
    {
      name: 'awakening',
      type: 'group',
      label: 'Awakening (Epoch 3)',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Awakening Items',
          minRows: 1,
          labels: {
            singular: 'Timeline Item',
            plural: 'Timeline Items',
          },
          fields: createRoleFields(),
        },
      ],
    },
    {
      name: 'cards',
      type: 'group',
      label: 'Profile Cards Section',
      admin: {
        description: 'Two interactive cards below the timeline navigation',
      },
      fields: [
        {
          name: 'bio',
          type: 'group',
          label: 'Biography Card (Who I am)',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Card Title',
              defaultValue: 'Who I am',
              required: true,
            },
            {
              name: 'teaser',
              type: 'textarea',
              label: 'Card Teaser Text',
              admin: {
                description: 'Short preview text shown on the card',
              },
              defaultValue:
                'Discover the journey, experiences, and passion that drive my work and creativity.',
            },
            {
              name: 'emphasis',
              type: 'text',
              label: 'Card Emphasis Text',
              admin: {
                description: 'Italicized text at the bottom of the card',
              },
              defaultValue: 'Click to learn more about my story',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Biography Content',
              admin: {
                description: 'Full biography text shown in the modal',
              },
              editor: headingLexicalConfig(['h3', 'h4', 'h5', 'h6']),
            },
          ],
        },
        {
          name: 'int',
          type: 'group',
          label: 'Interests Card (The way I am)',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Card Title',
              defaultValue: 'The way I am',
              required: true,
            },
            {
              name: 'teaser',
              type: 'textarea',
              label: 'Card Teaser Text',
              admin: {
                description: 'Short preview text shown on the card',
              },
              defaultValue:
                'Explore the interests, hobbies, and passions that shape my perspective and inspire my creativity.',
            },
            {
              name: 'emphasis',
              type: 'text',
              label: 'Card Emphasis Text',
              admin: {
                description: 'Italicized text at the bottom of the card',
              },
              defaultValue: 'See what drives my creativity',
            },
            {
              name: 'img',
              type: 'upload',
              label: 'Card Image',
              relationTo: 'media',
              admin: {
                description: 'Image to display on the interests card',
              },
            },
            {
              name: 'list',
              type: 'array',
              label: 'Personal Interests',
              minRows: 1,
              admin: {
                description: 'Categories of interests to display in the modal',
              },
              fields: [
                {
                  name: 'cat',
                  type: 'text',
                  label: 'Interest Category',
                  required: true,
                  admin: {
                    description: 'e.g., Sports, Movies, Music, Reading, etc.',
                  },
                },
                {
                  name: 'imgs',
                  type: 'array',
                  label: 'Representative Images',
                  minRows: 1,
                  maxRows: 5,
                  admin: {
                    description: 'Upload up to 5 images that represent this interest category',
                  },
                  fields: [
                    {
                      name: 'img',
                      type: 'upload',
                      label: 'Image',
                      relationTo: 'media',
                      required: true,
                    },
                    {
                      name: 'alt',
                      type: 'text',
                      label: 'Alt Text',
                      admin: {
                        description: 'Brief description of the image for accessibility',
                      },
                    },
                  ],
                },
                {
                  name: 'desc',
                  type: 'richText',
                  label: 'Interest Description',
                  admin: {
                    description: 'Detailed description of your interest in this category',
                  },
                  editor: headingLexicalConfig(),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
