const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
User = require('../models/user.model')

const getUserByID = async (id) => {
    try {
        console.log(id)

        if(id === undefined){
            throw new Error('User not found :(')
        }
        const user = await User.findById({'_id' : ObjectId(id)}).exec();
        return user;
    
    }   catch (e) {
        return false
    }
}


const getUserBalanceByID = async (id) => {
    try {
        console.log(id)
        if(id === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findById({'_id' : ObjectId(id)}).exec();
       // const user = await User.findOne({'userID' : reqUserID}).exec();

        return user.balance;

    }   catch (e) {
        return false
    }
    
}


const createUser = async (userID, name, fon, email, project, activity, transaction) => {
    try {

        let user = new User()
       
        user.userID = userID
      //  user.userID = ObjectId

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



const updateUser = async ( id, name, fon, email) => {
    try {

        if(id === undefined){
            throw new Error('User not found :(')
        }
        const query = {_id : ObjectId(id)}
        var update = {name : name, email : email, fon : fon }
        const updatedUser = await User.findByIdAndUpdate(query, update, {new: true})
        
        const ret = await updatedUser.save();
        
        return ret;


    }   catch (e) {
        console.log(e)
        return false
    }
}


const changeUserState = async ( id, active) => {
    try {

        if(id === undefined){
            throw new Error('User not found')
        }
        const query = {_id : ObjectId(id)}
        const update = {active : active}

        const updatedUser = await User.findByIdAndUpdate(query, update, {new: true})
  
        const ret = await updatedUser.save();
        
        return ret;


    }   catch (e) {
        console.log(e)
        return false
    }
}


/*Delete a User by ID*/
const deleteUser = async (id) => {
    try {
        if(id === undefined){
            throw new Error('User not found :(')
        }
        const user = await User.findByIdAndRemove({_id : ObjectId(id)}).exec();
        return user;
    }   catch (e) {
        console.log(e)
        return false
    }
}

const getUserTransactions = async (id) => {
    try {
        if(id === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findById({_id : ObjectId(id)}).exec();

        return user.transaction;

    }   catch (e) {
        return false
    }
    
}

const getUserActivity = async (id) => {
    try {
        if(id === undefined){
            throw new Error('User not found :(')
        }
        
        const user = await User.findById({_id : ObjectId(id)}).exec();

        return user.activity;

    }   catch (e) {
        return false
    }
    
}

const getUserProject = async (id) => {
    try {
        if(id === undefined){
            throw new Error('User not found :(')
        }
        
        
       const user = await User.findById({_id : ObjectId(id)}).exec();

        return user.project;

    }   catch (e) {
        return false
    }
    
}

const changeUserBalance = async ( id, balance) => {
    try {

        if(id === undefined){
            throw new Error('User not found')
        }
        const query = {_id : ObjectId(id)}
        const update = {balance : balance}

        const updatedUser = await User.findByIdAndUpdate(query, update, {new: true})
  
        const ret = await updatedUser.save();
        
        return ret;


    }   catch (e) {
        console.log(e)
        return false
    }
}

const addProjectToUser = async(project, userID) => {

    try {
        if(userID === undefined){
            throw new Error('undefined id')
        }

        let newProject = project[0]
        
        const filter = {_id: ObjectId(id)}
        const update = {$push: {project: newProject}}
        
        const userUpdate = await Project.findByIdAndUpdate(filter, update, {new: true}) // returns querys
        const ret = await userUpdate.save()

        return ret
        
    } catch (error) {
        
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
    userServiceGetProjects: getUserProject,
    userServiceChangeBalance: changeUserBalance,
    userServiceAddProjectToUser: addProjectToUser
}