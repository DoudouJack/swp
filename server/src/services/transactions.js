const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
Transaction = require('../models/transaction_schema')

const convertTimestamp = (unix_timestamp) => {
    var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

return formattedTime
}


const getTransactions = async () => {
    try {
        const transactions = await Transaction.find({}).exec();
        console.log("in here")
        

        transactions.forEach(element => {
            console.log(convertTimestamp(+element.dateOfPayment))
            //let date = new Date(+element.dateOfPayment).toLocaleDateString("de-DE").toString()
         //   element.dateOfPayment = new Date(element.dateOfPayment).toLocaleDateString("en-US")
           
        });
        console.log(transactions)

        return transactions;
       
    } catch (e) {
        return false
    }
}

const createTransactions = async (userID, activityID, amount, currency, projectID) => {
    try {
        let transaction = new Transaction()

        transaction.activityID = activityID
        transaction.userID = userID
        transaction.amount = amount
        transaction.currency = currency
        transaction.projectID = projectID

        const ret = await transaction.save();
    
        return ret;
       
    } catch (e) {
        return false
    }
}

const getTransactionFor = async(activityID) => {
    try {
        console.log("get")
        console.log(activityID)

        if(activityID === undefined){
            throw new Error('undefined id')
        }

        const transactionFor = await Transaction.find({'activityID': activityID}).exec();

        return transactionFor;
       
    } catch (e) {
        return false
    }
}

const updateTransaction = async(activityID, userID) => {
    try {
        
        if(activityID === undefined && userID === undefined){
            throw new Error('undefined id')
        }

        const filter = { activityID: activityID, userID: userID };
        const update = { isPaid: true };

        
        const transactionUpdate = await Transaction.findOneAndUpdate(filter, update);
        
       // const transactionUpdate = await Transaction.find({'activityID': activityID, 'userID': userID}).exec();
        
        console.log(transactionUpdate)
        
        const ret = await transactionUpdate.save();
        
        return ret;
       
    } catch (e) {
        return false
    }
}

const getTransactionForUser = async(userID) => {
    try {
        console.log("get transaction for userid")
        console.log(userID)

        if(userID === undefined){
            throw new Error('undefined id')
        }
        
        const transactionFor = await Transaction.find({'userID': userID}).exec();
        return transactionFor;
    } catch (e) {
        return false
    }
}

module.exports = {
    transactionServiceGetAll: getTransactions,
    transactionServiceCreate: createTransactions,
    transactionServiceGetFor: getTransactionFor,
    transactionServiceUpdateIsPaid : updateTransaction,
    transactionGetUser: getTransactionForUser
}