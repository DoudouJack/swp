const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

/* CONTROLLER */
const authController = require("./controllers/authController")
const transactionController = require("./controllers/transactionController")
const userController = require("./controllers/userController")
const activityController = require("./controllers/activityController")

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', authController.checkAuth)

/* TRANSACTION */
/* GET http://localhost:8081/transactions */
app.get('/transactions', transactionController.transaction)

/*  http://localhost:8081/createTransaction  POST */
app.post('/createTransaction', transactionController.createTransaction)

/*  http://localhost:8081/getTransactionFor?activityID=a2  GET */
app.get('/getTransactionFor', transactionController.getTransactionFor)

/*  http://localhost:8081/updateTransactionIsPaid?activityID=a2&userID=u1  GET */
app.get('/updateTransactionIsPaid', transactionController.updateTransactionIsPaid)


/* ACTIVITY */
/* GET http://localhost:8081/activity */
app.get('/activity', activityController.activity)
/*  http://localhost:8081/createActivity  POST */
app.post('/createActivity', activityController.createActivity)
/*  http://localhost:8081/updateActivity  POST */
app.post('/updateActivity', activityController.updateActivity)
/* http://localhost:8081/getSingleActivity?id=5df12e80a5155f02f34dd850*/
app.get('/getSingleActivity', activityController.getSingleActivity)

/* PROJECT */


/* USER */
/*  http://localhost:8081/createUser POST */
app.post('/createUser', userController.createUser)

/* http://localhost:8081/getUserByID?userID=u1 */
app.get('/getUserbyID', userController.getUserByID)

/* http://localhost:8081/getUserBalanceByID?userID=u1 */
app.get('/getUserBalanceByID', userController.getUserBalanceByID)

/*http://localhost:8081/updateUser POST */
app.post('/updateUser', userController.updateUser)






app.listen(process.env.PORT || 8081)
