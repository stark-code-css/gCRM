const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const user = require('./routes/user')
const consumer = require('./routes/consumer')
const app = express()

dotenv.config()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

connectDB();

app.use(user)
app.use(consumer)