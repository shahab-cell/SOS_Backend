// app.js
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import { connectDB } from './config/database.js'

const app = express()

const PORT = 5000

dotenv.config()
connectDB()
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1', userRoutes)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})
