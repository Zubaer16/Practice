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
    } //

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
}
