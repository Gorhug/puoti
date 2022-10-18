import { env as private_env } from '$env/dynamic/private'
import { default as nodemailer } from 'nodemailer'

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: private_env.MAILTRAP_USER,
      pass: private_env.MAILTRAP_PASS
    }
  })