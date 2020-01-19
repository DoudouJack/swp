const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
const admin = require('firebase-admin')

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
            })
            .catch( error => {
                console.log(error.errorInfo.code)
                // error happends if token is expired or null or undefined
                // if(error.errorInfo.code === 'messaging/registration-token-not-registered' || receiver === 'null' || receiver === 'undefined')
            })
        
    } catch (e) {
        return false
    }
}

module.exports = {
    notificationService: sendMessage,
}