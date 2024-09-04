import { CollectionConfig } from 'payload/types'

export const Applicants: CollectionConfig = {
  slug: 'applicants',
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: 'Not given',
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
    },
  ],
  timestamps: true,
}
