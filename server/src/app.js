const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

/* CONTROLLER */
const authController = require("./controllers/authController")
const generalController = require("./controllers/generalController")

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', authController.checkAuth)
app.get('/transactions', generalController.transaction)
app.get('/createTransaction', generalController.createTransaction)
app.get('/createUser', generalController.createUser)

app.get('/getUserbyID', generalController.getUserByID)


app.listen(process.env.PORT || 8081)
