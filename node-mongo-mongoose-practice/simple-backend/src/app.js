import express from 'express'
import helmet from 'helmet'
import routes from './routes/v1/index.js'
import { config } from './config/config.js'
import { successHandler, errorHandler } from './config/morgan.js'
const app = express()

if (config.env != 'test') {
  app.use(successHandler)
  app.use(errorHandler)
}

app.use(helmet())

app.use(express.json())
app.use('/v1', routes)

export default app
