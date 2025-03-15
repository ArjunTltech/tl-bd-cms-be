import express from 'express'
import dotenv from 'dotenv'
import indexRoute from './routes/indexRoute.js'
import cors from 'cors'
dotenv.config()
const app =express()
app.use(express.json())
app.use(cors("*"));
app.use(express.urlencoded({ extended: true })); 
const port =process.env.PORT
const url =process.env.URL
app.use('/api',indexRoute)

app.listen(port,()=>{
console.log(`Server started successfully : ${url}${port}`);
    
})