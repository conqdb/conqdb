import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { collections } from '@/payload/collections'
import { globals } from '@/payload/globals'
import { plugins } from '@/payload/plugins'
import { locales } from '@/payload/locales'

import { seed } from './payload/seed'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'user',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterLogin: ['./payload/components/DiscordLoginButton/DiscordLoginButton#DiscordLoginButton'],
    },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
    prodMigrations: migrations,
  }),
  localization: {
    locales,
    defaultLocale: 'en',
    fallback: true,
  },
  endpoints: [
    {
      path: '/validate-request',
      method: 'get',
      handler: async (req) => {
        return Response.json({ user: req.user })
      },
    },
  ],
  sharp,
  plugins,
  onInit: async (payload) => {
    if (Boolean(process.env.SEED)) {
      await seed(payload)
    }
  },
})
