const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
Project = require('../models/project_schema')
var admin = require("firebase-admin");
Transaction = require('../models/transaction_schema')
Activity = require('../models/activity_schema')




const getProjects = async (userID) => {
    try {
        const projects = await Project.find({ member: { "$in": [userID] } }).exec();
        console.log(projects)

        return projects;

    } catch (e) {
        return false
    }
}



const createProject = async (title, description, member, activity, projectPayType, creator, date) => {
    try {
        let link = await createLink()
        let project = new Project()



        let memberFromEmail = []
        for (let i = 0; i < member.length; i++) {
            console.log(member[i])
            await admin.auth().getUserByEmail(member[i])
                .then(function (userRecord) {
                    memberFromEmail[i] = userRecord.uid
                })
                .catch(function (error) {
                    console.log('Error fetching user data:', error);
                });
        }
        member = memberFromEmail

        project.title = title
        project.description = description
        project.member = member
        project.activity = activity
        project.link = link
        project.projectPayType = projectPayType
        project.creator = creator
        project.date = date

        const ret = await project.save()


        return [ret, project._id]
    } catch (error) {
        console.log(error)
        return false
    }
}

const createLink = async () => {
    /* TODO */
    return '/staticLinkNeedsToBeEdited'
}

const getSingleProject = async (id) => {
    try {
        if (id === undefined) {
            throw new Error('undefined id')
        }

        const ret = await Project.find({ '_id': ObjectId(id) }).exec();
        return ret
    } catch (error) {
        return false
    }
}


const updateProject = async (id, title, description, projectCompleted, projectPayType) => {
    try {
        if (id === undefined) {
            throw new Error('undefined id')
        }

        const filter = { _id: ObjectId(id) }
        const update = { title: title, description: description, projectCompleted: projectCompleted, projectPayType: projectPayType }

        const projectUpdate = await Project.findByIdAndUpdate(filter, update, { new: true }) // returns querys
        const ret = await projectUpdate.save()

        return ret
    } catch (error) {

    }
}

const addMemberToProject = async (id, member) => {
    try {
        console.log('*************************AddMemberToProject Called********************')
        if (id === undefined) {
            throw new Error('undefined id')
        }

        let newMember = member[0]

        const filter = { _id: ObjectId(id) }
        const update = { $push: { member: newMember } }

        const projectUpdate = await Project.findByIdAndUpdate(filter, update, { new: true }) // returns querys

        const ret = await projectUpdate.save()



        /* Update current Transactions with new Amount*/
       let activity =  projectUpdate.activity

       let newAmountToSplitt
       let newAmountSplitted
       let singleActivityID 
       let projectMember = projectUpdate.member.length

       for(let i = 1; i<activity.length; i++){
        singleActivityID = activity[i]
        const singleActivity = await Activity.find({'_id': singleActivityID}).exec();
        
        singleActivity.forEach(function(value, key){
        newAmountToSplitt = value.toObject().amount
        })
       
       newAmountSplitted = Math.round(newAmountToSplitt/projectMember*100)/100
        
       try{
        let query = {activityID: singleActivityID}
           let update2 = {amount : newAmountSplitted}
      //     const transactions = await Transaction.findOneAndUpdate(query, update2);
           const transactions = await Transaction.findByIdAndUpdate(query, update2);
           let myTransaction = await transactions.save()
           console.log('MYTRANSACTION: ', myTransaction)


           /*Create new Transaction for the new Member*/
           let transactionForNewMember = new Transaction()
           transactionForNewMember.activityID = singleActivityID
           transactionForNewMember.userID = member
           transactionForNewMember.amount = newAmountSplitted
           transactionForNewMember.currency = projectUpdate.currency
           transactionForNewMember.projectID = projectUpdate._id
            transactionForNewMember.save();
          
       } catch (error){
           console.log('some error occurs')
       }

       }
       

       // console.log(activity)

        

        return ret
    } catch (error) {

    }
}


const addActivity = async (id, activity) => {
    try {
        if (id === undefined) {
            throw new Error('undefined id')
        }

        let newActivity = activity[0]

        const filter = { _id: ObjectId(id) }
        const update = { $push: { activity: newActivity } }

        const projectUpdate = await Project.findByIdAndUpdate(filter, update, { new: true }) // returns querys
        const ret = await projectUpdate.save()

        return ret

    } catch (error) {

    }
}

const getActivitiesFromProject = async (id) => {
    try {
        if (id === undefined) {
            throw new Error('Project not found')
        }
        const ret = await Project.findOne({ _id: ObjectId(id) }).exec();
        return ret.activity
    } catch (error) {
        return false
    }
}


module.exports = {
    projectServiceGetAll: getProjects,
    projectServiceCreateProject: createProject,
    projectServiceGetSingleProject: getSingleProject,
    projectServiceUpdateProject: updateProject,
    projectServiceAddMember: addMemberToProject,
    projectServiceAddActivity: addActivity,
    projectServiceGetActivitiesFromProject: getActivitiesFromProject
}