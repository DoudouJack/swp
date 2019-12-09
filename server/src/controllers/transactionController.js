const { transactionServiceGetAll } = require('../services/transactions')
const { transactionServiceCreate } = require('../services/transactions')
const { transactionServiceGetFor } = require('../services/transactions')
const { transactionServiceUpdateIsPaid } = require('../services/transactions')
const { userServiceGet } = require('../services/users')
const { userServiceCreate } = require('../services/users')


//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const transaction = async (req, res, next) => {
  try {
    const internalresponse = await transactionServiceGetAll()
    console.log("internal response")
    console.log(internalresponse)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    if (internalresponse.length > 0) {
      res.json({
        message: 'success',
        data: internalresponse
      })
      
    } else {
      // return empty json
      res.json({
        message: 'No data entries available. Please create some in /createTransaction before.',
        data: []
      })
    }
    
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)

  }
}


const createTransaction = async (req, res, next) => {
  const userID = req.body.userID
  const transactionID = req.body.transactionID
  const activityID = req.body.activityID
  const amount = req.body.amount
  const currency = req.body.currency
  const isPaid = req.body.isPaid

  try {
    const internalresponse = await transactionServiceCreate(userID, transactionID, activityID, amount, currency, isPaid)
    console.log("internal response create")
    console.log(internalresponse)
    
    if (internalresponse !== false) {
      res.sendStatus(200).json({
        "message" : "Saved Succesfully"
      })
    } else {
      res.json({
        "message" : "Error while saving"
      })
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const getTransactionFor = async (req, res, next) => {
    
    console.log(req.query)
    console.log(req.query.activityID)
    console.log(req.body)
    
    let activityID;

    /* EXPORT TO FUNCTION */
    if (Object.keys(req.body).length === 0) {
      activityID = req.query.activityID
    }
    else {
      activityID = req.body.activityID 
    }
    
    try {
      const internalresponse = await transactionServiceGetFor(activityID)
      console.log("internal response create")
      console.log(internalresponse)
    
    if (internalresponse !== false) {
      res.json({
        "message" : "success",
        "data": internalresponse
      })
    } else {
      res.json({
        "message" : "Error. Something went wrong."
      })
    }
    } catch (e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }

}


const updateTransactionIsPaid = async (req, res, next) => {
  let activityID
  let userID

    /* EXPORT TO FUNCTION */
    if (Object.keys(req.body).length === 0) {
      activityID = req.query.activityID
      userID = req.quiery.userID
    }
    else {
      activityID = req.body.activityID 
      userID = req.body.userID
    }
    
    try {
      const internalresponse = await transactionServiceUpdateIsPaid(activityID, userID)
      console.log("internal response update")
      console.log(internalresponse)
    
    if (internalresponse !== false) {
      res.json({
        "message" : "success",
        "data": []
      })
    } else {
      res.json({
        "message" : "Error. Something went wrong."
      })
    }
    } catch (e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }
}


const createUser = async (req, res, next) => {
  const userID = req.query.userID

  // $_GET['userID']
  try {
    const internalresponse = await userServiceCreate(userID)
    console.log("internal response create")
    console.log(internalresponse)
    
    if (internalresponse) {
      // return json
    } else {
      // return empty json
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)

  }
}



const getUserByID = async (req, res, next) => {
  const userID = req.query.userID

  // $_GET['userID']
  try {
    const internalresponse = await userServiceGet(userID)
    console.log("internal response")
    console.log(internalresponse)
    
    if (internalresponse.length > 0) {
      res.json({
        message: 'success',
        data: internalresponse
      })
      
    } else {
      // return empty json
      res.status(404).json({
        message: 'No user found',
        data: []
      })
    }
    
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)

  }
}




module.exports = {
  transaction,
  createTransaction,
  getTransactionFor,
  getUserByID,
  createUser,
  updateTransactionIsPaid 
}