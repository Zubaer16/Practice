import JWT from 'jsonwebtoken'
import { user_information, users } from '../../db/schema.js'
import db from '../../db/db_connection.js'
import { eq } from 'drizzle-orm'
import dotenv from 'dotenv'
dotenv.config()

export const addUserInfo = async (req, res) => {
  try {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address

    // const checkDuplicate = await db
    //   .select()
    //   .from(user_information)
    //   .where(eq(user_information.id, id))

    // if (checkDuplicate.length > 0) {
    //   res.json('Only one user information can be added')
    // }

    await db
      .insert(user_information)
      .values({ id: id, name: name, address: address })
    res.json('User added successfully')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const allUsers = async (req, res) => {
  try {
    const allUsers = await db.select().from(user_information).execute()
    res.json(allUsers)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getUserbyId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const getUser = await db
      .select()
      .from(user_information)
      .where(eq(user_information.id, userId))
      .execute()

    if (getUser.length == 0) {
      res.send('User does not exist in the database')
    }
    res.json(getUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const putUserbyId = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const userAddress = req.body.address
    const getUser = await db
      .select()
      .from(user_information)
      .where(eq(user_information.id, userId))
      .execute()
    if (getUser.length == 0) {
      return res.send('User does not exist in the database')
    }

    await db
      .update(user_information)
      .set({ address: userAddress })
      .where(eq(user_information.id, userId))

    res.json('User updated successfully')
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const userAddress = req.body.address
    const getUser = await db
      .select()
      .from(user_information)
      .where(eq(user_information.id, userId))
      .execute()
    if (getUser.length == 0) {
      return res.send('User does not exist in the database')
    }

    await db.delete(user_information).where(eq(user_information.id, userId))

    res.json('User deleted successfully')
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}
