const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config({ path: 'backend/config/config.env' })

const sendEmail = async (options) => {
  try {
    // 1) Create a transporter
    var transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // Change this to true if your email provider requires SSL/TLS
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    console.log('Transporter created')

    // 2) Define the email options
    const message = {
      from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: `<div>${options.message}</div>`,
    }

    // 3) Actually send the email
    await transporter.sendMail(message)
    console.log('Email sent successfully')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendEmail
