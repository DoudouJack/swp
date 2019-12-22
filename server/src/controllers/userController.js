const { userServiceGet } = require('../services/users')
const { userServiceCreate } = require('../services/users')
const { userServiceGetBalance } = require('../services/users')
const { userServiceUpdate } = require('../services/users')
const { userServiceChangeState } = require('../services/users')
const { userServiceDeleteUser } = require('../services/users')
const { userServiceGetTransactions} = require('../services/users')
const { userServiceGetActivities} = require('../services/users')
const { userServiceGetProjects} = require('../services/users')



const createUser = async (req, res, next) => {
    const userID = req.body.userID
    const name = req.body.name
    const fon = req.body.fon
    const email = req.body.email
    const project = req.body.project
    const activity = req.body.activity
    const transaction = req.body.transaction


   try {
      const internalresponse = await userServiceCreate(userID, name, fon, email, 
        project, activity, transaction)
      console.log("internal response user create")
      console.log(internalresponse)
      
      if (internalresponse !== false) {
        res.sendStatus(200).json({
            "message" : "User created and saved succesfully"
        })
      } else {
        res.sendStatus(404).json({
            "message" : "Error while user saving"
        })
      }
      next()
    } catch (e) {
     // console.log(e.message)
     // res.sendStatus(500) && next(error)
  
    }
  }

  const getUserBalanceByID = async (req, res, next) => {
    let id;
    if(Object.keys(req.body).length === 0) {
      id = req.query.id
    } else {
      id = req.body.id
    }
  
    try {
      const internalresponse = await userServiceGetBalance(id)
      console.log("internal response")
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


  const getUserByID = async (req, res, next) => {
    let id;
    if(Object.keys(req.body).length === 0) {
      id = req.query.id
    } else {
      id = req.body.id
    }
    try {
      const internalresponse = await userServiceGet(id)
      if (internalresponse !== false) {
        res.json({
          "Data": internalresponse
        })
      } else {
        res.json({
          "Message" : "Error. Something went wrong."
        })
      }
     } catch (e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
     }
  }

  
  const updateUser = async(req, res, next) => {
    let userID
    
    if (Object.keys(req.body).length === 0) {
        userID = req.quiery.userID
    }
    else {
        userID = req.body.userID
    }

    try {
      const internalresponse = await userServiceUpdate(req.query.userID, req.body.name, req.body.fon, req.body.email)
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


 
const changeUserState = async(req, res, next) => {
  const id = req.query.id
  const active = req.body.active

  try {
    const internalresponse = await userServiceChangeState(id, active)
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
  /*Delete a User*/
  const deleteUser = async (req, res, next) => {
   
    console.log(req.query)
    console.log(req.query.userID)
    console.log(req.body)

    let userID;
    
  
    if(Object.keys(req.body).length === 0) {
      userID = req.query.userID
    } else {
      userID = req.body.userID
    }

    try {
      const internalresponse = await userServiceDeleteUser(userID)
      console.log("internal response")
      console.log(internalresponse)
      


      if (internalresponse !== false) {
        res.json({
          "message" : "User: "+userID+" deleted"
          
        })
      } else {
        res.json({
          "message" : "Error. Something went wrong."
        })
      }
      
        
      
      
    } catch (e) {
      console.log(e.message)
     // res.sendStatus(500) && next(error)
  
    }
  }

  /*Get Users transactions*/
  const getUserTransactions = async (req, res, next) => {
    let userID;
    if(Object.keys(req.body).length === 0) {
      userID = req.query.userID
    } else {
      userID = req.body.userID
    }
    
    try {
      const internalresponse = await userServiceGetTransactions(userID)
      console.log("internal response")
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

  /*Get Users activities*/
  const getUserActivities = async (req, res, next) => {
    let userID;
    if(Object.keys(req.body).length === 0) {
      userID = req.query.userID
    } else {
      userID = req.body.userID
    }
    // $_GET['userID']
    try {
      const internalresponse = await userServiceGetActivities(userID)
      console.log("internal response")
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

  /*Get Users projects*/
  const getUserProjects = async (req, res, next) => {
    let userID;
    if(Object.keys(req.body).length === 0) {
      userID = req.query.userID
    } else {
      userID = req.body.userID
    }
    // $_GET['userID']
    try {
      const internalresponse = await userServiceGetProjects(userID)
      console.log("internal response")
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



  module.exports = {
    getUserByID,
    getUserBalanceByID,
    createUser,
    updateUser,
    changeUserState,
    deleteUser,
    getUserTransactions,
    getUserProjects,
    getUserActivities
  }
  