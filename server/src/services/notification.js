const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
const admin = require('firebase-admin')
Userproperties = require('../models/userproperties_schema')
NotificationSetting = require('../models/notificationsetting_schema')

const sendMessage = async (receiver, title, description) => {
    try {
        // get message token for userID (token)
        console.log('in here')
        const retMessageToken = await Userproperties.find({'userToken': receiver}).exec()
     
        retMessageToken.forEach(function(value, key){
            console.log(value.toObject().messageToken)

            const message = {
                token: value.toObject().messageToken,
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
                return false
                // error happends if token is expired or null or undefined
                // if(error.errorInfo.code === 'messaging/registration-token-not-registered' || receiver === 'null' || receiver === 'undefined')
            })
            
        })

        return true

        // and check if he has notifications turned on
    } catch (e) {
        console.log(e.message)
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

const notificationSetting = async (userID, on) => {
    try {
        console.log('works notification setting')
        console.log(userID)
        console.log(on)

        const filter = {userID: userID}
        const update = {userID: userID, notificationTurnOn: on}
        

        const updateQuery = await NotificationSetting.update(filter, update, {upsert: true, new: true})
        console.log(updateQuery)
       
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const getNotificationSetting = async (userID) => {
    try {
        const ret = await NotificationSetting.find({'userID': userID}).exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    notificationService: sendMessage,
    saveUserToken: saveUserToken,
    turnOnNotfications: notificationSetting,
    getNotificationSetting: getNotificationSetting
}