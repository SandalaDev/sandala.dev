import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Project } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Project | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Project | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'projects'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          // Override confirmationMessage field
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }

          // Add custom blocks to the fields
          if ('name' in field && field.name === 'fields' && field.type === 'blocks') {
            return {
              ...field,
              blocks: [
                ...(field.blocks || []),
                // Section Title block
                {
                  slug: 'sectionTitle',
                  labels: {
                    singular: 'Section Title',
                    plural: 'Section Titles',
                  },
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
                },
                // Checkbox Group block
                {
                  slug: 'checkboxGroup',
                  labels: {
                    singular: 'Checkbox Group',
                    plural: 'Checkbox Groups',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                      label: 'Field Name',
                      admin: {
                        description:
                          'This will be used as the field name in form submissions (lowercase, no spaces)',
                      },
                    },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      label: 'Group Label',
                      admin: {
                        description: 'The main label displayed above the checkbox group',
                      },
                    },
                    {
                      name: 'options',
                      type: 'array',
                      required: true,
                      minRows: 1,
                      label: 'Checkbox Options',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                          label: 'Option Label',
                        },
                        {
                          name: 'value',
                          type: 'text',
                          required: true,
                          label: 'Option Value',
                          admin: {
                            description: 'Internal value (lowercase, no spaces recommended)',
                          },
                        },
                      ],
                      admin: {
                        description: 'Add the checkbox options for this group',
                      },
                    },
                    {
                      name: 'includeNoneOption',
                      type: 'checkbox',
                      label: 'Include "None" option',
                      defaultValue: true,
                      admin: {
                        description: 'When checked, deselects all other options',
                      },
                    },
                    {
                      name: 'noneLabel',
                      type: 'text',
                      label: 'Label for "None" option',
                      defaultValue: 'None of the above',
                      admin: {
                        condition: (_, siblingData) => siblingData?.includeNoneOption,
                      },
                    },
                    {
                      name: 'required',
                      type: 'checkbox',
                      label: 'Required',
                      defaultValue: false,
                    },
                    {
                      name: 'width',
                      type: 'number',
                      defaultValue: 100,
                      min: 25,
                      max: 100,
                      label: 'Field Width (%)',
                    },
                  ],
                },
              ],
            }
          }

          return field
        })
      },
    },
  }),

  searchPlugin({
    collections: ['projects'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
