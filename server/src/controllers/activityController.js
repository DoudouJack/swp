const { activityServiceGetAll } = require('../services/activities')
const { activityServiceCreate } = require('../services/activities')

//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/
const activity = async (req, res, next) => {
    try {
        const internalresponse = await activityServiceGetAll()
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
                message: 'No data entries available. Please create some in /createActivity before.',
                data: []
            })
        }

    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)

    }
}

const createActivity = async (req, res, next) => {
    const activityID = req.body.activityID
    const title = req.body.title
    const description = req.body.description
    const member = req.body.member
    const amount = req.body.amount
    const currency = req.body.currency
    const projectID = req.body.projectID
    
    try {
        const internalresponse = await activityServiceCreate(activityID, title, description, member, amount, currency, projectID)
        console.log("internal response")
        console.log(internalresponse)

        if (internalresponse !== false) {
            res.json({
                message: 'Saved succesfully.',
                data: []
            })

        } else {
            // return empty json
            res.json({
                message: 'Error while saving entry.',
                data: []
            })
        }
    } catch (error) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}




module.exports = {
    activity,
    createActivity
}