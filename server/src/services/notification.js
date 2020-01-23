const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
const admin = require('firebase-admin')
Userproperties = require('../models/userproperties_schema')

const sendMessage = async (receiver, title, description) => {
    try {
        const message = {
            token: receiver,
            webpush: {
                notification: {
                    title: title,
                    body: description
                    // icon: url
                }
            }
        }

        admin.messaging().send(message)
            .then( () => {
                console.log("MESSAGE SENT SUCCESFULLY")
                return true
            })
            .catch( error => {
                console.log(error.errorInfo.code)
                return false
                // error happends if token is expired or null or undefined
                // if(error.errorInfo.code === 'messaging/registration-token-not-registered' || receiver === 'null' || receiver === 'undefined')
            })

            return true
        
    } catch (e) {
        return false
    }
}

const saveUserToken = async (userToken, messageToken) => {
    try {
        console.log('service')
        console.log(userToken)
        console.log(messageToken)

        let userproperties = new Userproperties()
        userproperties.userToken = userToken
        userproperties.messageToken = messageToken
        
        const ret = await userproperties.save();
        
        return ret;
    } catch (error) {
        return false
    }
}

module.exports = {
    notificationService: sendMessage,
    saveUserToken: saveUserToken
}