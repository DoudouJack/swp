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




const createUser = async (userID, name, fon, email) => {
    try {

        let user = new User()
       
        user.userID = userID
        user.name = name
        user.fon = fon
        user.email = email
        
        console.log(user)

        const ret = await user.save();

        
     /*   
        user.save( (err) => { 
            if (err) console.log(err)
            else console.log('user created and saved')
        });
*/
        
        return ret;
       
    } catch (e) {
        return false
    }
}




module.exports = {
    userServiceGet: getUserByID,
    userServiceCreate: createUser,
}