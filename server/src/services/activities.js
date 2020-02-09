const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { ObjectId } = mongoose.Types.ObjectId
Activity = require('../models/activity_schema')
Project = require('../models/project_schema')
Transaction = require('../models/transaction_schema')
User = require('../models/user.model')

/*
const getActivities = async () => {
    try {
        const activities = await Activity.find({}).exec();


        return activities;
       
    } catch (e) {
        return false
    }
}*/

const getActivities = async () => {
    try {
        const activities = await Activity.find({}).exec();


        return activities;
       
    } catch (e) {
        return false
    }
}


const createActivity = async(title, description, amount, currency, projectID, creator, customDate) => {
    try {
        console.log('/CREATEACTIVITY called')
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
            currentAmount = value.toObject().projectAmount
            
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

            /*Create the paylink from creators paypalName and splitted amount*/
          
            const url = 'https://www.paypal.me/'
            let memberUser
            let userpaypalname
            let payLink
            const user = await User.find({'userID': creator}).exec();
            user.forEach(function(value, key){ 
                memberUser = value.toObject().member
                userpaypalname = value.toObject().paypalName
            })

            betrag = Math.round(amount/memberLength*100)/100
            payLink = url+userpaypalname+'/'+betrag
            activity.payLink = payLink
        
            let activityID = activity._id;

            /*
            format the CustomDate output: "Fri, 31 January 2020"
            */
            let todayCustom = new Date(customDate);  
            let dd = todayCustom.getDate(); 
            let mm = todayCustom.getMonth() + 1;
            let mmm =  todayCustom.getMonth();
            let yyyy = todayCustom.getFullYear(); 
            if (dd < 10) { 
                dd = '0' + dd; 
            } 
            if (mm < 10) { 
                mm = '0' + mm; 
            } 
            let day = todayCustom.getDay();
            switch(day){
                case 1: 
                    day = "Monday"
                break;
                case 2:
                    day = "Tuesday"
                break;
                case 3:
                    day = "Wednesday"
                break;
                case 4:
                    day = "Thursday"
                break;
                case 5:
                    day = "Friday"
                break;
                case 6:
                    day = "Saturday"
                break;
                case 0:
                    day = "Sunday"
                break;
            }

            switch(mmm){
                case 0: 
                    mmm = "Jan"
                break;
                case 1:
                    mmm = "Feb"
                break;
                case 2:
                    mmm = "Mar"
                break;
                case 3:
                    mmm = "Apr"
                break;
                case 4:
                    mmm = "May"
                break;
                case 5:
                    mmm = "Jun"
                break;
                case 6:
                    mmm = "Jul"
                break;
                case 7:
                    mmm = "Aug"
                break;
                case 8:
                    mmm = "Sep"
                break;
                case 9:
                    mmm = "Oct"
                break;
                case 10:
                    mmm = "Nov"
                break;
                case 11:
                    mmm = "Dec"
                break;
            }

            todayCustom = day + ', ' + dd + ' ' + mmm + ' ' + yyyy; 
            activity.customDate = todayCustom
           

           /*
           Get formated Date in activity
           */
            let today = new Date();  
             let ddd = today.getDate(); 
             let mmmm = today.getMonth() + 1; 
           let  yyyyy = today.getFullYear(); 
            if (ddd < 10) { 
                ddd = '0' + ddd; 
            } 
            if (mmmm < 10) { 
                mmmm = '0' + mmmm; 
            } 
            today = mmmm + '/' + ddd + '/' + yyyyy; 
            activity.date = today

            const ret = await activity.save()

     
            /*
            creates Transaction for each user in project with splitted amount
            */
            for(var i = 0; i < memberLength;i++){
            let transaction = new Transaction()
            transaction.activityID = activityID
            transaction.userID = member[i]
            transaction.amount = Math.round((amount/memberLength)*100/100)
            transaction.redAmount = Math.round((amount/memberLength)*100/100)
            transaction.currency = currency
            transaction.projectID = projectID
            transaction.save();
            
    //        console.log("Transaction saved")




            //Transaction of Activity creator is autom. isPaid=true
           const transactionTest = await Transaction.findOneAndUpdate({'userID': creator, 'activityID': activityID}, {'isPaid': true}).exec();
        
           //Add new Transactions to new Activity
            let newTransactionToActivity = transaction._id.toString()
            const filteraddTransactionToActivity = { _id: ObjectId(ret._id) }
            const updateAddTransactionToActivity = { $push: {transactions: newTransactionToActivity }}
            const activityUpdateAddTransaction = await Activity.findByIdAndUpdate(filteraddTransactionToActivity, updateAddTransactionToActivity, {new: true})
            const returnAddTransactionToActivity = await activityUpdateAddTransaction.save()
        }
        
        
/*
       const transactionTestneu = new Transaction()

       const filteraddTransactionToActivity = { _id: ObjectId(ret._id) }
       console.log('****************************************')
       transactionTestneu._id = transaction._id
       transactionTestneu.userID = member[i]

       transactionTestneu.save()
       console.log(transactionTestneu)
       const updateAddTransactionToActivity = { $push: {transactions: transactionTestneu }}
       const activityUpdateAddTransaction = await Activity.findByIdAndUpdate(filteraddTransactionToActivity, updateAddTransactionToActivity, {new: true})
       const returnAddTransactionToActivity = await activityUpdateAddTransaction.save()
      // console.log('****************************************')
       //console.log(returnAddTransactionToActivity)
   }
   */
   

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