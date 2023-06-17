const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/adminUpdate')

mongoose.connect("mongodb+srv://rewanadel:12345678910@cluster0.dvzmc2g.mongodb.net/store?authSource=Cluster0&authMechanism=SCRAM-SHA-1")
.then(console.log("Connected..."))
.catch((err)=>{console.log(err)})

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/user", userRouter)
app.use("/api/admin_update", adminRouter)
app.use("/api/login", authRouter)
module.exports = app;