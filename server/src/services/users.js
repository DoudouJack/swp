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

const createUser = async (userID, name, fon, email, project, activity, transaction) => {
    try {

        let user = new User()
       
        user.userID = userID
        user.name = name
        user.fon = fon
        user.email = email
        user.project = project
        user.activity = activity
        user.transaction = transaction
        
        console.log(user)

        const ret = await user.save();
      
        return ret;
       
    } catch (e) {
        return false
    }
}

const updateUser = async ( userID, name, fon, email) => {
    try {

        if(userID === undefined){
            throw new Error('User not found :(')
        }
        var query = {'userID' : userID};
        const updatedUser = await User.findOneAndUpdate(query,
            {'userID' : userID, 'name' : name, 'fon' : fon, 'email' : email}
            ).exec();
        
        const ret = await updatedUser.save();
        
        return ret;


    }   catch (e) {
        return false
    }
}

const changeUserState = async ( userID, active) => {
    try {

        if(userID === undefined){
            throw new Error('User not found :(')
        }
        var query = {'userID' : userID};
        const updatedUser = await User.findOneAndUpdate(query,
            {'userID' : userID, 'active' : active}
            ).exec();
        
        const ret = await updatedUser.save();
        
        return ret;


    }   catch (e) {
        return false
    }
}

const deleteUser = async (reqUserID) => {
    try {
        console.log("get")
        console.log(reqUserID)

        if(reqUserID === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findOneAndRemove({'userID' : reqUserID}).exec();

        return user;

    }   catch (e) {
        return false
    }
    
}

const getUserTransactions = async (reqUserID) => {
    try {
        if(reqUserID === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findOne({'userID' : reqUserID}).exec();

        return user.transaction;

    }   catch (e) {
        return false
    }
    
}

const getUserActivity = async (reqUserID) => {
    try {
        if(reqUserID === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findOne({'userID' : reqUserID}).exec();

        return user.activity;

    }   catch (e) {
        return false
    }
    
}

const getUserProject = async (reqUserID) => {
    try {
        if(reqUserID === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findOne({'userID' : reqUserID}).exec();

        return user.project;

    }   catch (e) {
        return false
    }
    
}

module.exports = {
    userServiceGet: getUserByID, 
    userServiceGetBalance: getUserBalanceByID,
    userServiceCreate: createUser,
    userServiceUpdate: updateUser,
    userServiceChangeState: changeUserState,
    userServiceDeleteUser: deleteUser,
    userServiceGetTransactions: getUserTransactions,
    userServiceGetActivities: getUserActivity,
    userServiceGetProjects: getUserProject
}