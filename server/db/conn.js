const mongoose = require("mongoose")

const conn = async () =>{
    await mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error connecting to database", err))
}

module.exports = conn