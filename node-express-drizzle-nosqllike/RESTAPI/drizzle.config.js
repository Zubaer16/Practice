import dotenv from 'dotenv'
dotenv.config()

export default {
  schema: './db/schema.js',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: 'localhost',
    user: 'postgres',
    password: '2233',
    database: 'user_role',
  },
}
