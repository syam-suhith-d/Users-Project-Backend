var express = require("express")
 
const { registerUser, loginUser, homePage } = require("../controllers/user-controllers")
const authMiddleware = require("../MiddleWare/auth-middleware")

var router = express.Router()

router.post("/register",registerUser)

router.post("/login",loginUser)

// home-routes
router.get("/home",authMiddleware,homePage)

module.exports = router