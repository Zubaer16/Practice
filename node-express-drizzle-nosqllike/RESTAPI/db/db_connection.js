import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import * as schema from './schema.js'

const pool = new pg.Pool({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: '2233',
  database: 'user_role',
})
await pool
  .connect()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log(err)
  })
const db = drizzle(pool, { schema })

export default db
