import express from 'express'
import mongoose from 'mongoose'
import { config } from './src/config/config.js'
import logger from './src/config/logger.js'
// import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes.js'

let server
const app = express()
const PORT = 5000

// Middleware
// app.use(bodyParser.json())

// Database connection
mongoose
  .connect(config.mongoose.url)
  .then(() => logger.info('Connected to MongoDB'))
server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`)
})

// Routes
app.use('/api/users', userRoutes)

// Start server
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// )
