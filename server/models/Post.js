const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    categories:{
        type: Array,
        required: false
    },
}, {
    timestamps: true,
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post