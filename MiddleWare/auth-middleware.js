var jwt = require("jsonwebtoken")

var authMiddleware = (req,res,next)=>{
    var authHeaders = req.headers["authorization"]
    var token = authHeaders && authHeaders.split(" ")[1]
    if(!token){
        console.log("No Account i.e token is empty")
        return res.status(200).json({message : "No Account"})
    }
    try{
        var decodeToken = jwt.verify(token,process.env.JWT_TOKEN)
        console.log("\nverification successful in the middleware")
        console.log("The decoded token is:",decodeToken,"\n");
        next()
    }catch(error){
        res.status(200).json({message : "Cannot access the route"})
        console.log("\nError",error,"\n");
    }
}

module.exports = authMiddleware