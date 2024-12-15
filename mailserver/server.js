import express from 'express'
import bodyParser from 'body-parser'
import SibApiV3Sdk from 'sib-api-v3-sdk'
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
        to: 'zubaer.16@gmail.com',
        name: 'User 1',
        description: 'This is a description for User 1.',
      },
      {
        to: 'zubaer.ahmed@fintechhub.com.bd',
        name: 'User 2',
        description: 'This is a description for User 2.',
      },
      // Add more mail objects as needed
    ],
  },
}

// Function to send emails
async function sendEmails() {
  const { subject, mails } = emailData.data

  try {
    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi()

    const sendEmailPromises = mails.map((mail) => {
      const sendEmail = {
        sender: { name: 'Zubaer', email: 'zubaer.ahmed7690@gmail.com' },
        to: [{ email: mail.to }],
        subject,
        textContent: `Hello ${mail.name},\n\n${mail.description}`,
        htmlContent: `<p>Hello <strong>${mail.name}</strong>,</p><p>${mail.description}</p>`,
      }

      return emailApi.sendTransacEmail(sendEmail)
    })

    const responses = await Promise.all(sendEmailPromises)
    console.log('Emails sent successfully!', responses)
  } catch (error) {
    console.error('Error sending emails:', error)
  }
}

// Endpoint to trigger email sending
app.get('/send-emails', async (req, res) => {
  await sendEmails()
  res
    .status(200)
    .json({ message: 'Emails processing started. Check logs for details.' })
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
