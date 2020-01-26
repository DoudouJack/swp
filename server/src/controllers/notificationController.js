const { notificationService } = require('../services/notification')
const { saveUserToken } = require('../services/notification')
const { turnOnNotfications } = require('../services/notification')
const { getNotificationSetting } = require('../services/notification')
const { getNotificationUser } = require('../services/notification')


/*
 * call other imported services, or same service but different functions here if you need to
*/
const sendMessage = async (req, res, next) => {
    const receiver = req.body.receiver // userID
    const title = req.body.title
    const description = req.body.description

    // const icon
    try {
        const internalresponse = await notificationService(receiver, title, description)
        console.log("internal response")
        console.log(internalresponse)
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        if (internalresponse) {
            res.json({
                message: 'success. Message sent.',
                title: title,
                description: description,
                receiver: receiver,
                data: internalresponse
            })

        } else {
            // return empty json
            res.json({
                message: 'Error.',
                data: []
            })
        }

    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)

    }
}

const saveUserRelatedTokens = async (req, res, next) => {
    const userToken = req.body.userToken
    const messageToken = req.body.messageToken

    try {
        const internalresponse = await saveUserToken(userToken, messageToken)
        console.log("internal response")
        console.log(internalresponse)
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        if (internalresponse) {
            res.json({
                message: 'success. Message sent.',
                data: internalresponse
            })

        } else {
            // return empty json
            res.json({
                message: 'Error.',
                data: []
            })
        }

    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(e)

    }
}

const saveNotificationsSetting = async (req, res, next) => {
    const userID = req.body.userID
    const on = req.body.on

    try {
        const internalresponse = await turnOnNotfications(userID, on)
        console.log("internal response")
        console.log(internalresponse)

        if (internalresponse) {
            res.json({
                message: 'Success. Saved Notification setting.',
                user: userID,
                data: internalresponse
            })
        } else {
            // return empty json
            res.json({
                message: 'Error.',
                data: []
            })
        }
    } catch (error) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getNotificationSettings = async (req, res, next) => {
    const userID = req.body.userID

    try {
        const internalresponse = await getNotificationSetting(userID)
        console.log("internal response")
        console.log(internalresponse)

        if(internalresponse) {
            res.json({
                message: 'Success.',
                user: userID,
                data: internalresponse
            })
        } else {
            // return empty json
            res.json({
                message: 'Error.',
                data: []
            })
        }
    } catch (error) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

const getNotificationForUser = async (req, res, next) => {
    const userID = req.body.userID

    try {
        const internalresponse = await getNotificationUser(userID)
        console.log("internal response")
        console.log(internalresponse)

        if(internalresponse) {
            res.json({
                message: 'Success.',
                user: userID,
                data: internalresponse
            })
        } else {
            // return empty json
            res.json({
                message: 'Error.',
                data: []
            })
        }
    } catch (error) {
        console.log(e.message)
        res.sendStatus(500) && next(e)
    }
}

module.exports = {
    sendMessage,
    saveUserRelatedTokens,
    saveNotificationsSetting,
    getNotificationSettings,
    getNotificationForUser
}