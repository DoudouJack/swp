const { projectServiceGetAll } = require('../services/projects')
const { projectServiceCreateProject } = require('../services/projects')
const { projectServiceGetSingleProject } = require('../services/projects')
const { projectServiceUpdateProject } = require('../services/projects')
const { projectServiceAddMember } = require('../services/projects')
const { projectServiceAddActivity } = require('../services/projects')

//const { auth } = middelwareService
/*
 * call other imported services, or same service but different functions here if you need to
*/

const project = async(req, res, next) => {
    let userID;

    if (Object.keys(req.body).length === 0) {
        userID = req.query.userID
    }
    else {
        userID = req.body.userID
    }
    console.log(userID)

    try {
        const internalresponse = await projectServiceGetAll(userID)
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
                message: 'No data entries available. Please create some in /createProject before.',
                data: []
            })
        }

    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)

    }
}

const createProject = async(req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const member = req.body.member
    const activity = req.body.activity
    const projectPayType = req.body.projectPayType
    const creator = req.body.creator

    try {
        const internalresponse = await projectServiceCreateProject(title, description, member, activity, projectPayType, creator)
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
        console.log(error.message)
        res.sendStatus(500) && next(error)
    }
}

const getSingleProject = async(req, res, next) => {
    let id;

    /* EXPORT TO FUNCTION */
    if (Object.keys(req.body).length === 0) {
        id = req.query.id
    }
    else {
        id = req.body.id
    }

    try {
        const internalresponse = await projectServiceGetSingleProject(id)

        console.log("internal response")
        console.log(internalresponse)

        if (internalresponse !== false) {
            res.json({
                message: 'Success.',
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
        console.log(error.message)
        res.sendStatus(500) && next(error)
    }
}

const updateProject = async(req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const id = req.body.id
    const projectPayType = req.body.projectPayType
    const projectCompleted = req.body.projectCompleted

    try {
        const internalresponse = await projectServiceUpdateProject(title, description, id, projectPayType, projectCompleted)
        console.log("internal response")
        console.log(internalresponse)

        if (internalresponse !== false) {
            res.json({
                message: 'Updated succesfully.',
                data: internalresponse
            })

        } else {
            // return empty json
            res.json({
                message: 'Error while updating entry.',
                data: []
            })
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500) && next(error)
    }
}

const addMember = async(req, res, next) => {
    const member = req.body.member
    const id = req.body.id

    try {
        const internalresponse = await projectServiceAddMember(id, member)
        console.log("internal response")
        console.log(internalresponse)

        if (internalresponse !== false) {
            res.json({
                message: 'Added member successfully.',
                data: internalresponse
            })

        } else {
            // return empty json
            res.json({
                message: 'Error while updating entry.',
                data: []
            })
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500) && next(error)   
    }
}

const addActivity = async(req, res, next) => {
    const activity = req.body.activity
    const id = req.body.id
    
    try {
        const internalresponse = await projectServiceAddActivity(id, activity)
        console.log("internal response")
        console.log(internalresponse)

        if (internalresponse !== undefined && internalresponse !== false) {
            res.json({
                message: 'Added activity successfully.',
                data: internalresponse
            })

        } else {
            // return empty json
            res.json({
                message: 'Error while adding entry.',
                data: []
            })
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500) && next(error)
    }
}



module.exports = {
    project,
    createProject,
    getSingleProject,
    updateProject,
    addMember,
    addActivity
}