const dotenv = require("dotenv")
const express = require('express');
const bodyParser = require('body-parser');
const databaseConnection = require("./config/database")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/userRoutes")
const propertyRoute = require("./routes/propertyRoutes")
const cors = require("cors")

const app = express();
dotenv.config({
    path: ".env"
})
databaseConnection();
app.use(express.urlencoded({
    extended:true
}));


const corsOptions = {
    origin: 'http://localhost:5173', // Allow this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute ); //http://localhost:8080/api/v1/user/register
app.use("/api/v1/seller", propertyRoute); //http://localhost:8080/api/v1/seller/addproperty

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Comming from backend...."
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listent at port number ${PORT}`)
})