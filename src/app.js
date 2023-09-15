const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter     = require('./routes/user');
const productsRouter = require('./routes/product');
const cartRouter     = require('./routes/cart');
const orderRouter    = require('./routes/order');
const stripeRouter   = require('./routes/stripe');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(console.log("Connected..."))
.catch((err)=>{console.log(err)});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/api/user",    userRouter);
app.use("/api/cart",    cartRouter);

app.use("/api/order",   orderRouter);
app.use("/api/product", productsRouter);
app.use("/api/stripe",  stripeRouter);

module.exports = app;
