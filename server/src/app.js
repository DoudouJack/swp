const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

/* CONTROLLER */
const authController = require("./controllers/authController")
const transactionController = require("./controllers/transactionController")
const userController = require('./controllers/userController')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', authController.checkAuth)

/* GET http://localhost:8081/transactions?userID=20 */
app.get('/transactions', transactionController.transaction)

/*  http://localhost:8081/createTransaction  POST */
app.post('/createTransaction', transactionController.createTransaction)

app.post('/createUser', userController.createUser)

app.get('/getUserbyID', userController.getUserByID)


app.listen(process.env.PORT || 8081)
