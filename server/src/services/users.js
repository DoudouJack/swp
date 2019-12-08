const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
User = require('../models/user.model')





const getUserByID = async (userID) => {
    try {
        console.log(userID)
        
        User.findById(userID, function (err, user) {
            if (err) return next(err);
            res.send(user);
        })

    }   catch (e) {
        return false
    }
}




const createUser = async () => {
    try {

        let user = new User()
       
        user.userID = 'u1'
        user.name = 'User Eins'
        user.fon = 123456789
        user.email = 'user@user1.de'
        
        user.save( (err) => { 
            if (err) console.log(err)
            else console.log('user created and saved')
        });

        
        return true;
       
    } catch (e) {
        return false
    }
}




module.exports = {
    userServiceGet: getUserByID,
    userServiceCreate: createUser
}