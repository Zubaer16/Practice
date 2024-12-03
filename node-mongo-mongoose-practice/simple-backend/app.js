import express from 'express'
import userRoutes from './src/routes/userRoutes.js'

const app = express()
app.use('/api/users', userRoutes)

export default app
