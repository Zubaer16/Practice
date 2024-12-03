import express from 'express'
import helmet from 'helmet'
import userRoutes from './src/routes/userRoutes.js'
import { config } from './src/config/config.js'
import { successHandler, errorHandler } from './src/config/morgan.js'
const app = express()

if (config.env != 'test') {
  app.use(successHandler)
  app.use(errorHandler)
}

app.use(helmet())

app.use('/api/users', userRoutes)

export default app
