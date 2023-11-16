const express =  require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")

// CREATE A POST

router.post("/post/write", verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// UPDATE POST

router.patch("/post/:id", verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// DELETE POST

router.delete("/post/:id", verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId: req.params.id})
        res.status(200).json({message:"Post deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// GET A POST

router.get("/post/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// GET ALL POST

router.get("/", async (req, res) => {
    try {
        const search = {
            title:{$regex:req.query.search, $options:"i"}
        }
        const posts = await Post.find(req.query.search ? search : {})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// GET A POST OF A USER

router.get("/user/:userId", async (req, res) => {
    try {
        const posts = await Post.find({userId: req.params.userId})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})


module.exports = router