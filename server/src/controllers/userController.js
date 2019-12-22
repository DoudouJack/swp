const { userServiceGet } = require('../services/users')
const { userServiceCreate } = require('../services/users')
const { userServiceGetBalance } = require('../services/users')
const { userServiceUpdate } = require('../services/users')
const { userServiceChangeState } = require('../services/users')
const { userServiceDeleteUser } = require('../services/users')
const { userServiceGetTransactions} = require('../services/users')
const { userServiceGetActivities} = require('../services/users')
const { userServiceGetProjects} = require('../services/users')
const { userServiceChangeBalance } = require('../services/users')



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

/*Get User by ID */
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
 
/* Update User Name, Email, fon */
const updateUser = async(req, res, next) => {
  const id = req.query.id
  const name = req.body.name
  const email = req.body.email
  const fon = req.body.fon
  try {
    const internalresponse = await userServiceUpdate(id, name, fon, email)
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

/*Change user state active || false */
const changeUserState = async(req, res, next) => {
  const id = req.query.id
  const active = req.body.active
  try {
    const internalresponse = await userServiceChangeState(id, active)
    console.log("internal response update")
    console.log(internalresponse)
  if (internalresponse !== false) {
    res.json({
      "message" : "User state successfully changed."
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
    let id;
    if(Object.keys(req.body).length === 0) {
      id = req.query.id
    } else {
      id = req.body.id
    }

    try {
      const internalresponse = await userServiceDeleteUser(id)
      console.log("internal response")
      console.log(internalresponse)
      


      if (internalresponse !== false) {
        res.json({
          "message" : "User: "+id+" deleted"
          
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
    let id;
    if(Object.keys(req.body).length === 0) {
      id = req.query.id
    } else {
      id = req.body.id
    }
    
    try {
      const internalresponse = await userServiceGetTransactions(id)
      console.log("internal response")
      console.log(internalresponse)
      if (internalresponse !== false) {
        res.json({
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
    let id;
    if(Object.keys(req.body).length === 0) {
      id = req.query.id
    } else {
      id = req.body.id
    }
    // $_GET['userID']
    try {
      const internalresponse = await userServiceGetActivities(id)
      console.log("internal response")
      console.log(internalresponse)
      if (internalresponse !== false) {
        res.json({
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
    let id;
    if(Object.keys(req.body).length === 0) {
      id = req.query.id
    } else {
      id = req.body.id
    }
    // $_GET['userID']
    try {
      const internalresponse = await userServiceGetProjects(id)
      console.log("internal response")
      console.log(internalresponse)
      if (internalresponse !== false) {
        res.json({
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

  const changeUserBalance = async(req, res, next) => {
    const id = req.query.id
    const balance = req.body.balance
    try {
      const internalresponse = await userServiceChangeBalance(id, balance)
      console.log("internal response update")
      console.log(internalresponse)
    if (internalresponse !== false) {
      res.json({
        "message" : "Users balance successfully changed."
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
    getUserActivities,
    changeUserBalance
  }
  