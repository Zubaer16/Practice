import express from 'express'
import db from './db/db_connection.js'

const app = express()

const port = 4000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Assalamu Alaikum!')
})

// app.get('/getAll',(req,res)=>{
//     const
// })
const posts = await db.query.users.findMany()
console.log(posts[0].id)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
