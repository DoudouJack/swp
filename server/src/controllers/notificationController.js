const { notificationService } = require('../services/notification')
const { saveUserToken } = require('../services/notification')


/*
 * call other imported services, or same service but different functions here if you need to
*/
const sendMessage = async (req, res, next) => {
    const receiver = "dYzMdkFBvk1SsYN-A_-kqD:APA91bHY7IgkR-PmqfF1koUyAXJZFJZnEimHmiM72FrAJ7NDILvChkrpdlegoSZO554IFKZfTTWa7tUIi_89Gm-7VMAe6Qm7kEctnH3YQ8-PLQu97uf6BZr0yHR_RTF48Hb_K1NhUZfv"
    const title = "Das hier ist der Titel"
    const description = "Body von der Nachricht"
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

module.exports = {
    sendMessage,
    saveUserRelatedTokens
}