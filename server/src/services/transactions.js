const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
Transaction = require('../models/transaction_schema')

const getTransactions = async (userID) => {
    try {
        console.log(userID)
        console.log("IN HERE")
        
        /* let collection2 = [];

        const query = await Transaction.get( (err,collection) => { 
            if (err) {
                console.log(err)
            }
            else{
                console.log(collection);
                return collection
            } 
        }); */

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

        const ret = await transaction.save();
    
        return ret;
       
    } catch (e) {
        return false
    }
}

module.exports = {
    transactionServiceGet: getTransactions,
    transactionServiceCreate: createTransactions,
}