const express =  require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")

// CREATE A COMMENT

router.post("/comment/write", verifyToken, async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(201).json(savedComment)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// UPDATE COMMENT

router.patch("/comment/:id", verifyToken, async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedComment)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// DELETE COMMENT

router.delete("/comment/:id", verifyToken, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Comment deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// GET POST COMMENTS

router.get("/post/:postId", async (req, res) => {
    try {
        const posts = await Comment.find({postId: req.params.postId})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router