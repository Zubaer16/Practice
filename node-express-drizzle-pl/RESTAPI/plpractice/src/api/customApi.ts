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
// export const setupCustomApi = (app: Express, payload: Payload) => {
//   app.get('/api/posts', async (req: Request, res: Response) => {
//     try {
//       // Fetch posts using Payload's built-in REST API method
//       const posts = await payload.find({
//         collection: 'posts',
//         limit: 10, // Limit to 10 posts, you can adjust this as needed
//       });

//       res.status(200).json(posts);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       res.status(500).json({ message: 'An error occurred while fetching posts.' });
//     }
//   });
// };
