var user = require("../model/users")
var bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")

var registerUser = async(req,res)=>{
    try{
        var {username, email, password, role} = req.body
        var existUser = await user.findOne({$or : [{username, email}]})
        if(existUser){
            res.status(200).json({message : "user already exists"})
        }

        var salt = await bcrypt.genSalt(10)
        var hashedPassword = await bcrypt.hash(password,salt)

        var newUser = await user.create({
            username,
            email,
            password : hashedPassword,
            role
        })
        res.status(201).json({message : "user created successfully"})

    }catch(error){
        console.log("error",error);
        res.status(500).json({message : "error occured"})
    }
}

var loginUser = async(req,res)=>{
    try{
        var {username,password} = req.body
        var checkUser = await user.findOne({username})
        if(!checkUser){
            return res.status(200).json({message : "invalid user credentials"})
        }
        var comparePassword = await bcrypt.compare(password,checkUser.password)
        if(!comparePassword){
            return res.status(200).json({message:"invalid credentials"})
        }
        var token = jwt.sign({
            userid : checkUser._id,
            username : checkUser.username,
            role : checkUser.role
        },process.env.JWT_TOKEN,{expiresIn : "1d"})
        res.status(200).json({message: "login succesfull",mytoken : token})
    }catch(error){
        console.log("error",error);
    }
}

var homePage = async(req,res)=>{
    res.status(200).json({message : "welcome to the home page"})
}

module.exports = {
    registerUser,loginUser,homePage
}