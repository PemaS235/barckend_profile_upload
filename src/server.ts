import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import profileRouter from './routes/profileRoutes'
import connectDB from './config/db'

// Load environment variables
dotenv.config()


const app = express()
const PORT = 8000


// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())


// Server Upload
app.use('/upload', express.static(path.join(__dirname, '../upload')))


// Routes
app.use('/api/v1/profile', profileRouter)


// Root Route 
app.get('/', (req, res) => {
    res.send(`
        API is running...
        Status: Online
    `)
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})


