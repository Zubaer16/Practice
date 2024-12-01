import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
const PORT = 5000

// Middleware
app.use(bodyParser.json())

// Database connection
mongoose
  .connect('mongodb://127.0.0.1:27017/simple-backend')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

// Routes
app.use('/api/users', userRoutes)

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
