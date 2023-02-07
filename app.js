const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(express.json());
app.use(cors());

//routes
const productRoute =require("./routers/products.route")



app.use("/api/products",productRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YAY!");
});




module.exports = app;
