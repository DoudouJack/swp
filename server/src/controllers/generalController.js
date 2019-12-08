const { transactionServiceGet } = require('../services/transactions')
const { transactionServiceCreate } = require('../services/transactions')

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
        message: 'No content',
        data: []
      })
    }
    
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)

  }
}


const createTransaction = async (req, res, next) => {
  const userID = req.query.userID

  // $_GET['userID']
  try {
    const internalresponse = await transactionServiceCreate(userID)
    console.log("internal response create")
    console.log(internalresponse)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
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




module.exports = {
  transaction,
  createTransaction
}