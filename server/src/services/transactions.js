const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
Transaction = require('../models/transaction_schema')

const getTransactions = async () => {
    try {
        const transactions = await Transaction.find({}).exec();

        return transactions;
       
    } catch (e) {
        return false
    }
}

const createTransactions = async (userID, transactionID, activityID, amount, currency, isPaid) => {
    try {
        let transaction = new Transaction()

        transaction.transactionID = transactionID
        transaction.activityID = activityID
        transaction.userID = userID
        transaction.amount = amount
        transaction.currency = currency
        transaction.isPaid = isPaid

        console.log(transaction)

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

module.exports = {
    transactionServiceGetAll: getTransactions,
    transactionServiceCreate: createTransactions,
    transactionServiceGetFor: getTransactionFor,
    transactionServiceUpdateIsPaid : updateTransaction
}