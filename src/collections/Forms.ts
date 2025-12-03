import { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'fields',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'required',
              type: 'checkbox',
            },
            {
              name: 'width',
              type: 'number',
              defaultValue: 100,
            },
          ],
        },
        {
          slug: 'textarea',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'required',
              type: 'checkbox',
            },
            {
              name: 'width',
              type: 'number',
              defaultValue: 100,
            },
          ],
        },
        {
          slug: 'email',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'required',
              type: 'checkbox',
            },
            {
              name: 'width',
              type: 'number',
              defaultValue: 100,
            },
          ],
        },
        {
          slug: 'number',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'required',
              type: 'checkbox',
            },
            {
              name: 'width',
              type: 'number',
              defaultValue: 100,
            },
          ],
        },
      ],
    },

    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Submit',
    },
    {
      name: 'confirmationType',
      type: 'select',
      options: [
        { label: 'Message', value: 'message' },
        { label: 'Redirect', value: 'redirect' },
      ],
      defaultValue: 'message',
      required: true,
    },
    {
      name: 'confirmationMessage',
      type: 'richText',
      required: true,
      admin: {
        condition: (_, data) => data.confirmationType === 'message',
      },
    },
    {
      name: 'redirect',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        condition: (_, data) => data.confirmationType === 'redirect',
      },
    },
    {
      name: 'emails',
      type: 'array',
      fields: [
        {
          name: 'emailTo',
          type: 'text',
          required: true,
          label: 'Email To',
          defaultValue: '{{email}}',
        },
        {
          name: 'emailFrom',
          type: 'text',
          required: true,
          label: 'Email From',
          defaultValue: '"{{user}}" <{{email}}>',
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
          defaultValue: "You've received a new message.",
        },
        {
          name: 'message',
          type: 'richText',
        },
      ],
    },
  ],
}
