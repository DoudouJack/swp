const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
User = require('../models/user.model')


const getUserByID = async (reqUserID) => {
    try {
        console.log("get")
        console.log(reqUserID)

        if(reqUserID === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findOne({'userID' : reqUserID}).exec();

        return user;

    }   catch (e) {
        return false
    }
    
}

const getUserBalanceByID = async (reqUserID) => {
    try {
        if(reqUserID === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findOne({'userID' : reqUserID}).exec();

        return user.balance;

    }   catch (e) {
        return false
    }
    
}




const createUser = async (userID, name, fon, email) => {
    try {

        let user = new User()
       
        user.userID = userID
        user.name = name
        user.fon = fon
        user.email = email
        
        console.log(user)

        const ret = await user.save();
      
        return ret;
       
    } catch (e) {
        return false
    }
}




module.exports = {
    userServiceGet: getUserByID, 
    userServiceGetBalance: getUserBalanceByID,
    userServiceCreate: createUser,
}