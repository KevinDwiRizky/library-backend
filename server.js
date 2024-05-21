import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/DBConnection.js'

dotenv.config()

connectDb()
const app = express()
const port = process.env.PORT || 3001
const host = process.env.HOST || "localhost"

app.use(express.json())


app.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
})