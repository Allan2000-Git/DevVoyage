const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwtToken
    if(!token){
        return res.status(401).json({message:"You are not authorized to access you profile at this time"})
    }
    jwt.verify(token, process.env.SECRET_TOKEN, async(error, data) => {
        if(error){
            return res.status(403).json({message:"Invalid Token"})
        }
        req.userId = data._id
        next()
    })
}

module.exports = verifyToken