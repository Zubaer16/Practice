import express from 'express'
import bodyParser from 'body-parser'
import SibApiV3Sdk from 'sib-api-v3-sdk'
import cron from 'node-cron'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()

const nonSubscriberApiToken = process.env.NONSUBSCRIBER_API_TOKEN
// const nonSubscribedApiUrl = process.env.NONSUBSCRIBER
const nonSubscriberApiUrlTest = process.env.NONSUBSCRIBER_API_URL_TEST
const apiKey = process.env.EMAIL_SERVICE_SECRET

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKeyInstance = defaultClient.authentications['api-key']
apiKeyInstance.apiKey = apiKey

const fetchNonSubscribers = async () => {
  try {
    const { data } = await axios.get(nonSubscriberApiUrlTest, {
      headers: {
        Authorization: `Bearer ${nonSubscriberApiToken}`,
      },
    })
    return data.data // Return the subscriptions array
  } catch (error) {
    console.error(
      'Error fetching subscriptions:',
      error.response?.data || error.message
    )
    throw error
  }
}

const extractNonSubscriberEmails = (nonSubscriber) => {
  const nonSubscriberEmails = nonSubscriber.map(
    (item) => item.users_permissions_user?.email
  )
  if (nonSubscriberEmails.length === 0) {
    console.log('No emails found for sending.')
    return []
  }
  return nonSubscriberEmails // Return the correct variable
}

/**
 * Send emails using Brevo API.
 * @param {string[]} emails - List of email addresses to send emails to.
 */
const sendNonSubscriberEmails = async (nonSubscriberEmails) => {
  if (nonSubscriberEmails.length === 0) {
    console.log('No emails to send.')
    return
  }

  const emailList = nonSubscriberEmails.map((email) => ({ email }))
  const transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const sendSmtpEmail = {
    sender: { name: 'Nakhlah Team', email: 'zubaer.ahmed7690@gmail.com' },
    to: emailList,
    subject: 'Embark on Your Arabic Learning Journey with Nakhlah! 🌟',
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
  }

  try {
    await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail)
    console.log('Emails sent successfully to:', nonSubscriberEmails)
  } catch (error) {
    console.error(
      'Error sending emails:',
      error.response?.data || error.message
    )
  }
}

/**
 * Process subscriptions: Fetch data, extract emails, and send emails.
 */
const processNonSubscriberEmails = async () => {
  try {
    const nonSubscribers = await fetchNonSubscribers() // Fetch subscriptions
    const emails = extractNonSubscriberEmails(nonSubscribers)
    await sendNonSubscriberEmails(emails) // Send emails
  } catch (error) {
    console.error('Error processing subscriptions:', error.message)
  }
}

// Cron job to send emails 1 minute after the server starts
cron.schedule('*/1 * * * *', async () => {
  console.log('Cron job started: Sending bulk emails...')
  await processNonSubscriberEmails()
  console.log('Cron job completed')
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
