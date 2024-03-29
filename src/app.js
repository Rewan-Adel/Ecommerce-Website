const express      = require("express");
const app          = express();
const cookieParser = require('cookie-parser');
const bodyParser   = require("body-parser");
const mongoose     = require('mongoose');
const cors         = require('cors');

const userRouter     = require('./routes/user');
const productsRouter = require('./routes/product');
const cartRouter     = require('./routes/cart');
const orderRouter    = require('./routes/order');

const categoryRouter = require('./routes/category');
const brandRouter = require('./routes/brand');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(console.log("Connected..."))
.catch((err)=>{console.log(err)});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
}));

app.use("/",    userRouter);
app.use("/api/product", productsRouter);
app.use("/api/order",   orderRouter);
app.use("/api/cart",    cartRouter);

app.use("/api/category",  categoryRouter);
app.use("/api/brand",     brandRouter);

module.exports = app;
