const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routesUrls = require ("./routes/routes");


const router = express()


router.use(express.json())
router.use(cors())
router.use(bodyParser.json())

dotenv.config()

mongoose.connect(process.env.DATA_ACCESS, () => console.log("Database Connected")) 

router.use("/app", routesUrls)


router.listen(3001, () => {
    console.log("connected to port 3001")
})
