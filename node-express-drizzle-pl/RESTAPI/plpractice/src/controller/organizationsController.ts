import { Request, Response, Express, NextFunction } from 'express'
import { Payload } from 'payload'
import JWT from 'jsonwebtoken'

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

// const getPermission = async (req:Request, res:Response,next: NextFunction ) => {
//   const email = req.user.email // Extracted from JWT token

//   try {
//     const permission =
//     const user = permission[0]

//     if (user.status == 'user') {
//       return res.status(403).json({ message: 'Access denied' })
//     }
//     next()
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// }

//  function verifyToken(req: Request, res:Response, next:NextFunction) {
//   const token =
//     req.headers.authorization && req.headers.authorization.split(' ')[1]

//   if (!token) {
//     return res.status(401).json({ message: 'Missing token' })
//   }

//   try {
//     const decoded = JWT.verify(token, process.env.ACCESS_TOKEN)
//     req.user = decoded
//     next()
//   } catch (error) {
//     console.error('Token verification failed:', error.message)
//     res.status(401).json({ message: 'Invalid token' })
//   }
// }
