import { Payload } from 'payload'
import { Request, Response, Express } from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config

export const generateTokens = (app: Express, payload: Payload) => {
  app.post('/api/get-token', async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    const JWT_ACCESS = process.env.ORG_ACCESS_TOKEN
    const JWT_REFRESH = process.env.ORG_REFRESH_TOKEN

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required.' })
    }

    try {
      // Verify the refresh token
      const decoded = JWT.verify(refreshToken, JWT_REFRESH)

      // Generate a new access token
      const accessToken = JWT.sign(
        { userId: (decoded as { userId: String }).userId },
        JWT_ACCESS,
        { expiresIn: '1d' }
      )

      // Optionally generate a new refresh token
      const newRefreshToken = JWT.sign(
        { userId: (decoded as { userId: String }).userId },
        JWT_REFRESH,
        { expiresIn: '2d' }
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
