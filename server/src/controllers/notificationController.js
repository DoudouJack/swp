const { notificationService } = require('../services/notification')


/*
 * call other imported services, or same service but different functions here if you need to
*/
const sendMessage = async (req, res, next) => {
    const receiver = "ek6RAzItv58ep-MmZWhjCD:APA91bF2q9_8w5QbYFp1G-kFOMtUh82yAPERgoDlEtdVl7rml6e0Ud10y2CDyOhZmH-4PeZ3z3c0vZI4FKj4GV8-2LIBG0tomNJ2Rw7SEUPERubUDU8vmwKkVX9cQ8vuPMzxkULX79DS"
    const title = "Das hier ist der Titel"
    const description = "Body von der Nachricht"
    // const icon
    try {
        const internalresponse = await notificationService(receiver, title, description)
        console.log("internal response")
        console.log(internalresponse)
        // other service call (or same service, different function can go here)
        // i.e. - await generateBlogpostPreview()
        if (internalresponse.length > 0) {
            res.json({
                message: 'success',
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
        res.sendStatus(500) && next(error)

    }
}

module.exports = {
    sendMessage
}