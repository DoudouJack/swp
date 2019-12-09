const { transactionServiceGet } = require('../services/transactions')
const { transactionServiceCreate } = require('../services/transactions')
//const { userServiceGet } = require('../services/users')
//const { userServiceCreate } = require('../services/users')


//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const transaction = async (req, res, next) => {
  const userID = req.query.userID

  // $_GET['userID']
  try {
    const internalresponse = await transactionServiceGet(userID)
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
      res.status(404).json({
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
      res.sendStatus(404).json({
        "message" : "Error while saving"
      })
    }
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

/*
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

*/



module.exports = {
  transaction,
  createTransaction
}