import JWT from 'jsonwebtoken'
import { users } from '../../db/schema.js'
import db from '../../db/db_connection.js'
import { eq } from 'drizzle-orm'
import dotenv from 'dotenv'
dotenv.config()

export const login = async (req, res) => {
  const reqUser = req.body
  //   res.json(reqUser.email)
  try {
    const email = await db
      .select()
      .from(users)
      .where(eq(users.email, reqUser.email))
    if (email.length == 0) {
      res.send('Username and password do not match')
    }
    if (email[0].password !== reqUser.password) {
      res.send('Username and password do not match')
    }

    const token = JWT.sign(email[0], process.env.ACCESS_TOKEN, {
      expiresIn: '1h',
    })
    const refreshToken = JWT.sign(email[0], process.env.REFRESH_TOKEN, {
      expiresIn: '2h',
    })

    res.send({ token, refreshToken })

    // res.json('login success')
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export function verifyToken(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  try {
    const decoded = JWT.verify(token, process.env.ACCESS_TOKEN)
    req.user = decoded
    next()
  } catch (error) {
    console.error('Token verification failed:', error.message)
    res.status(401).json({ message: 'Invalid token' })
  }
}

export const getAllPermission = async (req, res, next) => {
  const email = req.user.email // Extracted from JWT token

  try {
    const permission = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute()
    const user = permission[0]

    if (user.status == 'user') {
      return res.status(403).json({ message: 'Access denied' })
    }
    next()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getSinglePermission = async (req, res, next) => {
  const email = req.user.email
  const reqUserId = req.user.id
  const paramsid = parseInt(req.params.id) // Extracted from JWT token

  try {
    const permission = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .execute()
    const user = permission[0]

    if (reqUserId != paramsid && reqUserId != 1) {
      return res.status(403).json({ message: 'Access denied' })
    }

    next()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getToken = async (req, res) => {
  const { refreshToken } = req.body

  //   res.json(refreshToken)
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' })
  }

  try {
    // Verify the refresh token
    const decoded = JWT.verify(refreshToken, process.env.REFRESH_TOKEN)

    // Generate a new access token
    const accessToken = JWT.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN,
      { expiresIn: '1h' } // Example: 15 minutes expiration
    )

    // Optionally generate a new refresh token
    const newRefreshToken = JWT.sign(
      { userId: decoded.userId },
      process.env.REFRESH_TOKEN,
      { expiresIn: '2h' } // Example: 7 days expiration
    )

    // Send the new tokens in the response
    return res.json({
      accessToken,
      refreshToken: newRefreshToken, // Send the new refresh token
    })
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired refresh token.' })
  }
}
