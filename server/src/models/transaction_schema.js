var mongoose = require('mongoose');

var transaction = mongoose.Schema({
    transactionID: {
        type: String,
        required: true
    },
    dateOfPayment: {
        type: String,
        default: Date.now
    },
    activityID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    }
});

transaction.index({userID: 1, activityID: 1}, {unique: true})


var Transaction = module.exports = mongoose.model('Transaction', transaction)

module.exports.get = function (callback) {
    Transaction.find(callback)
}
