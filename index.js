import express from 'express'
import cors from 'cors'
import mongodb from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json({extended:true,limit:"1mb"}))
app.use(express.urlencoded({extended:true,limit:"1mb"}))

app.use(cors())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

import routes from './routes/index.js'
app.use(routes)

mongodb.connect("mongodb://localhost:27017/CarMeet")
.then(()=>{app.listen(process.env.PORT,()=>{console.log(`Listening Server Port : ${process.env.PORT}`)})})
.catch(err=>console.log(err))
