var mongoose = require("mongoose")

var connectToDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the Data-Base");

    }catch(error){
        console.log("error",error);
    }
}

module.exports = connectToDatabase