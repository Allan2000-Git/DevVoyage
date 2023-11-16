const express = require("express")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const conn = require("./db/conn")
const authRouter = require("./routes/auth")
const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
const commentRouter = require("./routes/commentRoutes")

conn()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(cookieParser())
app.use("/images", express.static(path.join(__dirname,"/images")));
app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

// uploading image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.img)
    }
})

const  upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.status(200).json({message:"Image uploaded successfully"})
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
})
