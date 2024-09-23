import { Request, Response, Express } from 'express'
import { Payload } from 'payload'

export const customApi = (app: Express, payload: Payload) => {
  app.get('/api/custom/posts', async (req: Request, res: Response) => {
    try {
      const posts = await payload.find({
        collection: 'posts',
        limit: 10,
      })

      res.status(200).json(posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  })
}
//
