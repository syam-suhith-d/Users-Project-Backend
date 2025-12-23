var express = require("express")
var userRoutes = require("./Routes/user-routes")

var app = express()
app.use(express.json())
app.use("/user/api",userRoutes)

require("dotenv").config()
var PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log("\nThe server is running");
})

// connect to the data base
var connectToDatabase = require("./dataBase/db")
connectToDatabase()