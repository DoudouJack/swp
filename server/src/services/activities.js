const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
Activity = require('../models/activity_schema')

const getActivities = async () => {
    try {
        const activies = await Activity.find({}).exec();

        return activies;
       
    } catch (e) {
        return false
    }
}


const createActivity = async(title, description, member, amount, currency, projectID) => {
    try {
        const splitAmount = await split(parseFloat(member.length), parseFloat(amount)) 
        let activity = new Activity()

        activity.activityID = activityID
        activity.title = title
        activity.description = description
        activity.member = member
        activity.amount = amount
        activity.splitAmount = splitAmount.toString()
        activity.currency = currency
        activity.projectID = projectID
        
        const ret = await activity.save();
        
        return ret;

    } catch (error) {
        console.log(error)
        return false;
    }
}

const split = async(memberLength, amount) => {
    let ret = amount / memberLength
    
    return ret
}

const updateActivity = async(activityID, title, description, member, amount, currency, projectID, id) => {
    try {
        if(id === undefined){
            throw new Error('undefined id')
        }

        const splitAmount = await split(parseFloat(member.length), parseFloat(amount)) 
        
        const filter = {_id: ObjectId(id)}
        const update = {activityID: activityID, title: title, description: description, member: member, amount: amount, splitAmount: splitAmount, currency: currency, projectID: projectID}
        
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