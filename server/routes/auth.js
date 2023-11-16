const express =  require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// REGISTER

router.post("/register", async (req, res)=>{
    try {
        const {username, email, password} = req.body

        // hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)

        const newUser = new User({username, email, password: hashedPassword})
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// LOGIN

router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const matchedUser = await bcrypt.compare(req.body.password, user.password)

        if(!matchedUser){
            return res.status(401).json({message: "Wrong credentials"})
        }

        const token = jwt.sign({_id: user._id, username: user.username, email: user.email}, process.env.SECRET_TOKEN, {expiresIn:"3d"})
        const {password, ...info} = user._doc

        res.cookie("jwtToken",token).status(200).json(info)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// LOGOUT

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("jwtToken",{sameSite:"none", secure:true}).status(200).json("User logged out")
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// REFETCH USER

router.get("/refetch",(req,res)=>{
    const token = req.cookies.jwtToken
    jwt.verify(token, process.env.SECRET_TOKEN,{},(error, data) => {
        if(error){
            return res.status(404).json(error)
        }
        res.status(200).json(data)
    }) 
})


module.exports = router