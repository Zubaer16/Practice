import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const pool = new pg.Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})
await pool
  .connect()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log(err)
  })
const db = drizzle(pool)

export default db
