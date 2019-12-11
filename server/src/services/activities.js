const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
Activity = require('../models/activity_schema')

const getActivities = async () => {
    try {
        const activies = await Activity.find({}).exec();

        return activies;
       
    } catch (e) {
        return false
    }
}


const createActivity = async(activityID, title, description, member, amount, currency, projectID) => {
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


module.exports = {
    activityServiceGetAll: getActivities,
    activityServiceCreate: createActivity
}