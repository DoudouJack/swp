const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
Project = require('../models/project_schema')


const getProjects = async () => {
    try {
        const projects = await Project.find({}).exec();

        return projects;
       
    } catch (e) {
        return false
    }
}

const createProject = async(projectID, title, description, member, activity, projectPayType) => {
    try {
        let link = await createLink()
        let project = new Project()

        project.projectID = projectID,
        project.title = title
        project.description = description
        project.member = member
        project.activity = activity
        project.link = link
        project.projectPayType = projectPayType

        const ret = await project.save()


        return ret
    } catch (error) {
        return false
    }
}

const createLink = async() => {
    /* TODO */
    return '/staticLinkNeedsToBeEdited'
}

const getSingleProject = async(id) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }

        const ret = await Project.find({'_id': ObjectId(id)}).exec();
        return ret
    } catch (error) {
        return false
    }
}


const updateProject = async(id, title, description, projectCompleted, projectPayType) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }

        const filter = {_id: ObjectId(id)}
        const update = {title: title, description: description, projectCompleted: projectCompleted, projectPayType: projectPayType}
        
        const projectUpdate = await Project.findByIdAndUpdate(filter, update, {new: true}) // returns querys
        const ret = await projectUpdate.save()
        
        return ret        
    } catch (error) {
        
    }
}

const addMemberToProject = async(id, member) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }

        let newMember = member[0]

        const filter = {_id: ObjectId(id)}
        const update = {$push: {member: newMember}}
        
        const projectUpdate = await Project.findByIdAndUpdate(filter, update, {new: true}) // returns querys
        const ret = await projectUpdate.save()

        return ret
    } catch (error) {
        
    }
}


const addActivity = async(id, activity) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }

        let newActivity = activity[0]
        
        const filter = {_id: ObjectId(id)}
        const update = {$push: {activity: newActivity}}
        
        const projectUpdate = await Project.findByIdAndUpdate(filter, update, {new: true}) // returns querys
        const ret = await projectUpdate.save()

        return ret
        
    } catch (error) {
        
    }
}


module.exports = {
    projectServiceGetAll: getProjects,
    projectServiceCreateProject: createProject,
    projectServiceGetSingleProject: getSingleProject,
    projectServiceUpdateProject: updateProject,
    projectServiceAddMember: addMemberToProject,
    projectServiceAddActivity: addActivity
}