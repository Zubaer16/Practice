import { CollectionConfig } from 'payload/types'

export const Comments: CollectionConfig = {
  slug: 'comments',
  fields: [
    {
      name: 'comments',
      type: 'text',
      required: true,
    },
  ],
}
