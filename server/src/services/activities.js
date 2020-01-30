const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
Activity = require('../models/activity_schema')
Project = require('../models/project_schema')
Transaction = require('../models/transaction_schema')


const getActivities = async () => {
    try {
        const activities = await Activity.find({}).exec();


        return activities;
       
    } catch (e) {
        return false
    }
}


const createActivity = async(title, description, amount, currency, projectID, creator) => {
    try {
        // check if projectID is existing
        
        if(amount>=0){
        const projects = await Project.find({'_id': ObjectId(projectID)}).exec();
        let memberLength, member, currency, currentAmount

        projects.forEach(function(value, key){
            console.log(value.toObject().member)
            console.log(value.toObject().member.length)
           // memberLength = value.toObject().member.length 
            member = value.toObject().member
            currency = value.toObject().currency
            memberLength = value.toObject().member.length 
            console.log("memberlength: " + memberLength)
            currentAmount = value.toObject().projectAmount
            console.log("current amount: " + currentAmount)
        })
       
        if(projects.length > 0 ){
            let activity = new Activity()

            activity.title = title
            activity.description = description
            activity.amount = amount
            activity.currency = currency
            activity.projectID = projectID
            activity.greenAmount = Math.round(amount/memberLength*(memberLength-1)*100)/100,
            activity.redAmount = Math.round(amount/memberLength*100)/100
            activity.creator = creator
            activity.payLink = 'paypal.me/USER/BETRAG'
    
            let activityID = activity._id;

            const ret = await activity.save()

     
            /*
            creates Transaction for each user in project with splitted amount
            */
            for(var i = 0; i < memberLength;i++){
            let transaction = new Transaction()
            
           
            transaction.activityID = activityID
            transaction.userID = member[i]
            transaction.amount = amount/memberLength
            transaction.currency = currency

            transaction.save();
            
            console.log("Transaction saved")
            }

            let newAmount = parseFloat(amount)+parseFloat(currentAmount)

            const filter = {_id: ObjectId(projectID)}
            const update = {projectAmount: newAmount}
        
            const projectUpdate = await Project.findByIdAndUpdate(filter, update, {new: true})
            const ret2 = await projectUpdate.save()
            console.log("amount update")
            console.log(ret2)

             /*
            Adds Activity to corrosponding Project
            */
           let newActivityIDToProject = ret._id.toString()
           const filterAddActivity = { _id: ObjectId(projectID) }
           const updateAddActivity = { $push: { activity: newActivityIDToProject } }
           const projectUpdateAddActivity = await Project.findByIdAndUpdate(filterAddActivity, updateAddActivity, { new: true })
           const returnAddedActivity = await projectUpdateAddActivity.save()
           
        
            return ret;
        }
        else {
            console.log("no project ID found")
            return false
        }
    }else{
        console.log('Activity´s amount needed to be >=0')
        return false
    }
    } catch (error) {
        console.log(error)
        return false;
    } 
}

const split = async(memberLength, amount) => {
    let ret = amount / memberLength
    
    return ret
}

const updateActivity = async(title, description, member, amount, currency, projectID, id) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }

        const splitAmount = await split(parseFloat(member.length), parseFloat(amount)) 
        
        const filter = {_id: ObjectId(id)}
        const update = {title: title, description: description, member: member, amount: amount, splitAmount: splitAmount, currency: currency, projectID: projectID}
        
        const activityUpdate = await Activity.findByIdAndUpdate(filter, update, {new: true}) // returns querys
        const ret = await activityUpdate.save()
        
        return ret

    } catch (error) {
        console.log(error)
        return false
    }
}

const getSingleActivity = async(id) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }
        const ret = await Activity.find({'_id': ObjectId(id)}).exec();
        return ret
    } catch (error) {
        console.log(error)
        return false
    }
}


module.exports = {
    activityServiceGetAll: getActivities,
    activityServiceCreate: createActivity,
    activityServiceUpdate: updateActivity,
    activityServiceGetSingleActivity: getSingleActivity
}