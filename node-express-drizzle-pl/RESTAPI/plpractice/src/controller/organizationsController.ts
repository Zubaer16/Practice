import { Request, Response, Express } from 'express'
import { Payload } from 'payload'

export const organizationsController = (app: Express, payload: Payload) => {
  app.post(
    '/api/organization-register',
    async (req: Request, res: Response) => {
      const { email, password } = req.body

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: 'Email, password are required.' })
      }

      try {
        const checkDuplicateEmail = await payload.find({
          collection: 'organizations',
          where: {
            email: {
              equals: email,
            },
          },
        })
        if (checkDuplicateEmail.docs.length != 0) {
          return res.json('Email alreadey exists')
        }
        await payload.create({
          collection: 'organizations',
          data: {
            email,
            password,
          },
        })
        return res.status(201).json('Organization registered successfully !')
      } catch (error) {
        console.error('Error registering organization:', error)
        return res
          .status(500)
          .json({ message: 'Error registering organization.' })
      }
    }
  )
}
