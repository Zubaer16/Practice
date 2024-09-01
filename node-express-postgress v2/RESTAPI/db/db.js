import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '2233',
  database: 'user_role',
})
await client
  .connect()
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log(err)
  })
const db = drizzle(client)

export default db
