import { Payload } from 'payload'
import { Request, Response, Express } from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config

export const organizationsAuth = (app: Express, payload: Payload) => {
  app.post('/api/organization-login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const JWT_ACCESS = process.env.ORG_ACCESS_TOKEN
    const JWT_REFRESH = process.env.ORG_REFRESH_TOKEN

    if (!email || !password) {
      return res.status(400).json({ message: 'Email, password are required.' })
    }

    try {
      const checkemail = await payload.find({
        collection: 'organizations',
        where: {
          email: {
            equals: email,
          },
        },
      })

      const user = checkemail.docs

      if (user.length == 0) {
        return res.json('Username and password do not match')
      }
      if (user[0].password !== password) {
        return res.json('Username and password do not match')
      }

      const token = JWT.sign({ user }, JWT_ACCESS, {
        expiresIn: '1d',
      })
      const refreshToken = JWT.sign({ user }, JWT_REFRESH, {
        expiresIn: '2d',
      })

      return res.json({ token, refreshToken })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch users' })
    }
  })

  app.post('/api/get-token', async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    const JWT_ACCESS = process.env.ORG_ACCESS_TOKEN
    const JWT_REFRESH = process.env.ORG_REFRESH_TOKEN

    //   res.json(refreshToken)
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' })
    }

    try {
      // Verify the refresh token
      const decoded = JWT.verify(refreshToken, JWT_REFRESH)
      // return res.json(decoded.length)
      // Generate a new access token
      const accessToken = JWT.sign(
        { userId: (decoded as { userId: String }).userId },
        JWT_ACCESS,
        { expiresIn: '1d' } // Example: 15 minutes expiration
      )

      // Optionally generate a new refresh token
      const newRefreshToken = JWT.sign(
        { userId: (decoded as { userId: String }).userId },
        JWT_REFRESH,
        { expiresIn: '2d' } // Example: 7 days expiration
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
  })
}
