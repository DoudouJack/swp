var mongoose = require('mongoose');

var transaction = mongoose.Schema({
    dateOfPayment: {
        type: String,
        default: new Date().toUTCString()
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
