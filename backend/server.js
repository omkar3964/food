import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'

// app config
const app = express()
const PORT = 4000
import 'dotenv/config'
import orderRouter from './routes/orderRoute.js'




// middleware
app.use(express.json())
app.use(cors())

// db coonection
connectDB()

// api endpoints
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/images',express.static('uploads'))



// routing
app.get('/',(req,res)=>{
    res.send('server is started')
})


app.listen(PORT,()=>{
    console.log(`server is starting on : ${PORT}`)
})