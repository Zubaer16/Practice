import { CollectionConfig } from 'payload/types'

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'post',
      type: 'text',
      required: true,
    },
    {
      name: 'placedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
