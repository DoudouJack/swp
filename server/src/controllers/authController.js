const { middelwareService } = require('../middleware/middleware')
console.log(middelwareService)

//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const checkAuth = async (req, res, next) => {
  const idToken = req.headers.authorization
  console.log(idToken)
  
  try {
    const internalresponse = await middelwareService(idToken)
    console.log("internal response")
    console.log(internalresponse)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    if(internalresponse){
      res.status(200).send('Authorisiert!')
    } else {
      res.status(401).send('Nicht Authorisiert!')
    }
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
    
  }
}

module.exports = {
  checkAuth
}