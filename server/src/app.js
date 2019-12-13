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
const projectController = require("./controllers/projectController")


app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', authController.checkAuth)

/* TRANSACTION */
/* http://localhost:8081/transactions GET */
app.get('/transactions', transactionController.transaction)

/*  http://localhost:8081/createTransaction  POST */
app.post('/createTransaction', transactionController.createTransaction)

/*  http://localhost:8081/getTransactionFor?activityID=a2  GET */
app.get('/getTransactionFor', transactionController.getTransactionFor)

/*  http://localhost:8081/updateTransactionIsPaid?activityID=a2&userID=u1  GET */
app.get('/updateTransactionIsPaid', transactionController.updateTransactionIsPaid)


/* ACTIVITY */
/* http://localhost:8081/activity GET */
app.get('/activities', activityController.activity)

/*  http://localhost:8081/createActivity  POST */
app.post('/createActivity', activityController.createActivity)

/*  http://localhost:8081/updateActivity  POST */
app.post('/updateActivity', activityController.updateActivity)

/* http://localhost:8081/getSingleActivity?id=5df12e80a5155f02f34dd850*/
app.get('/getSingleActivity', activityController.getSingleActivity)


/* PROJECT */
/* GET http://localhost:8081/project */
app.get('/projects', projectController.project)

/* http://localhost:8081/getSingleProject?id= GET */
app.get('/getSingleProject', projectController.getSingleProject)

/* http://localhost:8081/createProject  POST */
app.post('/createProject', projectController.createProject)

/* http://localhost:8081/addMember  POST */
app.post('/addMember', projectController.addMember)

/* http://localhost:8081/addActivity  POST */
app.post('/addActivity', projectController.addActivity)


/* USER */
/*  http://localhost:8081/createUser POST 
Body: 	userID : "u1"
		"name" : "User One",
		"fon" : "99999999",
		"email" : "userone@usermail.de"*/
app.post('/createUser', userController.createUser)

/* http://localhost:8081/getUserByID?userID=u1 GET*/
app.get('/getUserbyID', userController.getUserByID)

/* http://localhost:8081/getUserBalanceByID?userID=u1 GET*/
app.get('/getUserBalanceByID', userController.getUserBalanceByID)

/*http://localhost:8081/updateUser?userID=u1 PUT 
Body: 	"name" : "User One",
		"fon" : "99999999",
		"email" : "userone@usermail.de"*/
app.put('/updateUser', userController.updateUser)

/*http://localhost:8081/changeUserState PUT  
Body: "userID" : "u1",
	  "active" : "false"*/
app.put('/changeUserState', userController.changeUserState)

/* http://localhost:8081/deleteUser?userID=u1 DELETE*/
app.delete('/deleteUser', userController.deleteUser)














app.listen(process.env.PORT || 8081)
