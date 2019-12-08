const { db } = require('../con/dbcon')
const { mongoose } = require('../con/dbcon')
const { transactionSchema } = require('../models/transaction_schema')

const getTransactions = async (userID) => {
    try {
        console.log(userID)
        console.log("IN HERE")
   
    
        var Transaction = mongoose.model('Transaction', transactionSchema, "Transaction")

        Transaction.find({"transactionID": "t2"}, function(err,collection){ 
            if (err) console.log(err);
            console.log(collection)
         
        });

        
        return true;
       
    } catch (e) {
        return false
    }
}

module.exports = {
    transactionService: getTransactions
}