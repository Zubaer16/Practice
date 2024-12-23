import express from 'express'
import helmet from 'helmet'
import userRoutes from './routes/userRoutes.js'
import { config } from './config/config.js'
import { successHandler, errorHandler } from './config/morgan.js'
const app = express()

if (config.env != 'test') {
  app.use(successHandler)
  app.use(errorHandler)
}

app.use(helmet())

app.use(express.json())
app.use('/api/users', userRoutes)

export default app
