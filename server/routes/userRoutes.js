const express =  require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")

// UPDATE USER

router.patch("/user/:id", verifyToken, async (req, res) => {
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hashSync(req.body.password, salt)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// DELETE USER

router.delete("/user/:id", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId: req.params.id})
        await Comment.deleteMany({userId: req.params.id})
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// GET USER

router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...info} = user._doc
        res.status(200).json(info)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router