require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express();
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())

app.use("/",userRoute)

app.use(errorMiddleware)


app.get("/",(req,res)=>{
    res.send("Hello")
})


mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("DB connected")
    app.listen(PORT, ()=>{
        console.log(`Your server is running at ${PORT}`)
    })
})





