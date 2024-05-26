const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({
    path: "../config/.env"
})

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("MongoDB connected")
    }).catch((err) => {
        console.log("Error from database connection ", err);
    })
}

module.exports = databaseConnection