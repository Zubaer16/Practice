import express from 'express'
import bodyParser from 'body-parser'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import cron from 'node-cron'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Initialize Brevo API client
const apiKey = process.env.EMAIL_SERVICE_SECRET // Replace with your Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = apiKey

// Hardcoded JSON Data
const emailData = {
  data: {
    subject: 'testSubject',
    mails: [
      {
        to: 'mashrur.rahman333@gmail.com',
        name: 'User 1',
        description: 'This is a description for User 1.',
      },
      {
        to: 'emamjion@gmail.com',
        name: 'User 2',
        description: 'This is a description for User 2.',
      },
      // Add more mail objects as needed
    ],
  },
}

// Helper function to prepare email data
function prepareEmailData(emailData) {
  const { subject, mails } = emailData.data

  const recipients = mails.map((mail) => ({
    email: mail.to,
    name: mail.name,
  }))

  const params = mails.reduce((acc, mail, index) => {
    acc[`description${index}`] = mail.description
    acc[`name${index}`] = mail.name
    return acc
  }, {})

  return { subject, recipients, params }
}

// Preprocess email data
const { subject, recipients, params } = prepareEmailData(emailData)

// Function to send bulk emails
async function sendBulkEmails() {
  try {
    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi()

    const sendEmail = {
      sender: { name: 'Zubaer', email: 'zubaer.ahmed7690@gmail.com' },
      to: recipients, // Use preprocessed recipients
      subject,
      htmlContent: `
        <table style="width: 100%; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <tr>
    <td>
      <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">Discover the Art of Arabic with Nakhlah 🌟</h1>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin-bottom: 20px;">
        <strong><em>Are you ready to embark on a journey to learn Arabic and unlock new opportunities?</em></strong>
        Nakhlah is your gateway to mastering Arabic efficiently and beautifully.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin-bottom: 20px;">
        <strong><em>Whether you are a beginner or looking to refine your skills, Nakhlah offers:</em></strong>
      </p>
      <ul style="margin: 0; padding-left: 20px; margin-bottom: 20px;">
        <li style="margin-bottom: 10px;">Interactive Learning Tools</li>
        <li style="margin-bottom: 10px;">Expert-Curated Lessons</li>
        <li>Flexible Learning Paths</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin-bottom: 20px;">
        Join thousands of learners and take the first step today! 
        <a href="https://nakhlah.com/subscribe" style="color: #0066cc; text-decoration: none;">Subscribe Now</a>
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin-bottom: 20px;">
        Experience a platform designed to make Arabic learning easy, engaging, and enjoyable.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin-bottom: 20px; font-style: italic;">We can’t wait to have you with us!</p>
    </td>
  </tr>
  <tr>
    <td>
      <p style="margin-bottom: 5px; font-weight: bold;">Warm regards,</p>
      <p>The Nakhlah Team</p>
    </td>
  </tr>
</table>
      `,
      params, // Use preprocessed params for dynamic content
    }

    const response = await emailApi.sendTransacEmail(sendEmail)
    console.log('Bulk email sent successfully!', response)
  } catch (error) {
    console.error('Error sending bulk email:', error)
  }
}

// Cron job to send emails 1 minute after the server starts
// cron.schedule('*/1 * * * *', async () => {
//   console.log('Cron job started: Sending bulk emails...')
//   await sendBulkEmails()
//   console.log('Cron job completed')
// })

// Endpoint to trigger email sending
app.get('/send-emails', async (req, res) => {
  await sendBulkEmails()
  res
    .status(200)
    .json({ message: 'Bulk email processing started. Check logs for details.' })
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

console.log(recipients)
