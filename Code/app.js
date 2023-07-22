const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/adminUpdate");
const productsRouter = require("./routes/product");
const categoriesRouter = require("./routes/category");
const brandsRouter = require("./routes/brand");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("Connected..."))
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ecommerce-client-react-seven.vercel.app",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/admin_update", adminRouter);
app.use("/api/login", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/brands", brandsRouter);
module.exports = app;
