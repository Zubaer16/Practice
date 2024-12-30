import express from 'express'
import auth from '../../middlewares/auth.js'
import validate from '../../middlewares/validate.js'
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../../validation/index.js'
import User from '../../models/user.model.js'
const router = express.Router()

// Create a user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body)

    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update a user by ID
router.patch('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
