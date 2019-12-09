const { userServiceGet } = require('../services/users')
const { userServiceCreate } = require('../services/users')


const createUser = async (req, res, next) => {
    const userID = req.body.userID
    const name = req.body.name
    const fon = req.body.fon
    const email = req.body.email


   try {
      const internalresponse = await userServiceCreate(userID, name, fon, email)
      console.log("internal response user create")
      console.log(internalresponse)
      
      if (internalresponse !== false) {
        res.sendStatus(200).json({
            "message" : "User saved succesfully"
        })
      } else {
        res.sendStatus(404).json({
            "message" : "Error while user saving"
        })
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
    getUserByID,
    createUser
  }