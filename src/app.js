import 'dotenv/config'
import express from 'express'
import prisma from './config/prisma.js'
import ErrorMiddleware from './middlewares/error.niddleware.js'
import Routes from './routes/routes.js'

const app = express()

app.use(express.json())
app.use('/api', Routes())
app.use(ErrorMiddleware)

const PORT = process.env.PORT || 3000

const initApp = async () => {
  try {
    console.log('Salom')

    await prisma.$connect()
    console.log('Database connected.')

    app.listen(PORT, () => {
      console.log('Server is ranning', PORT)
    })
  } catch (error) {
    console.error(error.message)
  }
}

initApp()
