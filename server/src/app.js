const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

/* CONTROLLER */
const authController = require("./controllers/authController")
const transactionController = require("./controllers/transactionController")

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', authController.checkAuth)

/* GET http://localhost:8081/transactions */
app.get('/transactions', transactionController.transaction)

/*  http://localhost:8081/createTransaction  POST */
app.post('/createTransaction', transactionController.createTransaction)

/*  http://localhost:8081/getTransactionFor?activityID=a2  GET */
app.get('/getTransactionFor', transactionController.getTransactionFor)

/*  http://localhost:8081/updateTransactionIsPaid?activityID=a2&userID=u1  GET */
app.get('/updateTransactionIsPaid', transactionController.updateTransactionIsPaid)

app.get('/createUser', transactionController.createUser)
app.get('/getUserbyID', transactionController.getUserByID)


app.listen(process.env.PORT || 8081)
