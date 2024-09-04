import { CollectionConfig } from 'payload/types'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
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
  ],
  timestamps: true,
}
