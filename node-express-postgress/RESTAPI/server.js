//
const express = require('express')
const studentRoutes = require('./src/student/routes')

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Assalamu Alaikum!')
})

app.use('/api/v1/students', studentRoutes)

app.listen(port, () => console.log(`app listening on  port ${port}`))
