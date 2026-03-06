import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import cors from 'cors'
import "./config/passport.js"


const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true
}))
app.use('/auth', authRoute)
app.use('/user', userRoute)




app.listen(PORT, () => {
    connectDB()
    console.log(`Server is listening at port ${PORT}`);
})