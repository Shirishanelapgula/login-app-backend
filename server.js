require('dotenv').config()
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddleware")
const app = express();
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: FRONTEND ,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions))

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





