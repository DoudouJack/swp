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
const notificationController = require("./controllers/notificationController")


app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.get('/', authController.checkAuth)


/* CLOUD MESSAGING TEST */
/* http://localhost:8081/transactions GET */


app.get('/sendMessage', notificationController.sendMessage)
app.post('/saveUserRelatedTokens', notificationController.saveUserRelatedTokens)


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

/* http://localhost:8081/updateProject  POST */
app.post('/updateProject', projectController.updateProject)

/* http://localhost:8081/addMember  POST */
app.post('/addMember', projectController.addMember)

/* http://localhost:8081/addActivity  POST */
app.post('/addActivity', projectController.addActivity)


/* USER */

/*POST http://localhost:8081/createUser */
app.post('/createUser', userController.createUser)

/*GET http://localhost:8081/getUserByID?id= */
app.get('/getUserbyID', userController.getUserByID)

/*GET http://localhost:8081/getUserBalanceByID?id */
app.get('/getUserBalanceByID', userController.getUserBalanceByID)

/*PUT http://localhost:8081/updateUser?id=  */
app.put('/updateUser', userController.updateUser)

/*PUT http://localhost:8081/changeUserState?id=  */
app.put('/changeUserState', userController.changeUserState)

/*DELETE http://localhost:8081/deleteUser?id=  */
app.delete('/deleteUser', userController.deleteUser)

/*GET http://127.0.0.1:8081/getUserTransactions?id= */
app.get('/getUserTransactions', userController.getUserTransactions)

/*GET http://127.0.0.1:8081/getUserActivities?id= */
app.get('/getUserActivities', userController.getUserActivities)

/*GET http://127.0.0.1:8081/getUserProjects?id= */
app.get('/getUserProjects', userController.getUserProjects)

/*PUT http://127.0.0.1:8081/changeUserBalance?id= */
app.put('/changeUserBalance', userController.changeUserBalance)

/*PUT http://localhost:8081/changeUsersDefaultCurrency?id=  */
app.put('/changeUsersDefaultCurrency', userController.changeDefaultCurrency)







/* http://localhost:8081/addProjectToUser  POST */
app.post('/addProjectToUser', userController.addProjectToUser)



/*Add Activity to user*/



/*Add Transaction to user*/












app.listen(process.env.PORT || 8081)
