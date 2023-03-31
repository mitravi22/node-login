const express = require('express')
const cors = require('cors')
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express()
require('dotenv').config();

app.use(cookieParser());
 
app.use(session({
    secret: "thisisjwttokenforlogin",
    saveUninitialized: true,
    resave: true,
    cookie:{
        maxAge: 100000
    },
    rolling: false
}));
 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const router = require('./routes/user-registrationRoutes.js')
//const router = require("./routes/web");
app.use(router)



const PORT = process.env.PORT || 8002

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
})