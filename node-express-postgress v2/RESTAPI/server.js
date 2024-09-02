import express from 'express'
import router from './src/user_information/routes.js'

const app = express()

const port = 4000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Assalamu Alaikum!')
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

app.use('/api/v1/user_information', router)
