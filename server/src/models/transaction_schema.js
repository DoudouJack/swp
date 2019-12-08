var mongoose = require('mongoose');


/* TODO EXTEND REQUIRED */
var transaction = mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },
    dateOfPayment: {
        type: String,
        default: Date.now
    },
    activityID: String,
    userID: String,
    amount: String,
    currency: String,
    isPaid: Boolean
});


var Transaction = module.exports = mongoose.model('Transaction', transaction)

module.exports.get = function (callback) {
    Transaction.find(callback)
}
