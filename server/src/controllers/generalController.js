const { transactionService } = require('../services/transactions')


//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const transaction = async (req, res, next) => { 
  const userID = req.query.userID 

  // $_GET['userID']
  try {
    const internalresponse = await transactionService(userID)
    console.log("internal response")
    console.log(internalresponse)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    if(internalresponse){
      // return json
    } else {
     // return empty json
    }
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
    
  }
}

module.exports = {
    transaction
}