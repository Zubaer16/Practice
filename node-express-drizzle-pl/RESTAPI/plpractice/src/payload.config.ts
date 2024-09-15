import path from 'path'
import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import Users from './collections/Users'
import { Posts } from './collections/Posts'
import { Comments } from './collections/Comments'
import { customApi } from './api/customApi'
import { Organizations } from './collections/Organizations'
import { Applicants } from './collections/Applicants'
import { organizationsController } from './controller/organizationsController'
import { organizationsAuth } from './auth/organizationsAuth'
import { generateTokens } from './auth/generateTokens'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Posts, Comments, Organizations, Applicants],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  onInit: async (payload) => {
    customApi(payload.express, payload),
      organizationsController(payload.express, payload),
      organizationsAuth(payload.express, payload)
    generateTokens(payload.express, payload)
  },
})
