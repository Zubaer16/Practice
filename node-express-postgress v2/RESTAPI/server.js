import express from 'express'
import db from './db/db_connection.js'
import { users, user_information } from './db/schema.js'

const app = express()

const port = 4000

app.get('/', (req, res) => {
  res.send('Assalamu Alaikum!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.get('/users', async (req, res) => {
  try {
    const allUsers = await db.select().from(users).execute()
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

app.get('/user_information', async (req, res) => {
  try {
    const allUsers = await db.select().from(user_information).execute()
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

app.get('/', (req, res) => {})
