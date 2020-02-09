var mongoose = require('mongoose');

var transaction = mongoose.Schema({
    dateOfPayment: {
        type: String,
        default: new Date().toUTCString()
    },
    activityID: {
        type: String,
        required: false
    },
    userID: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    },
    currency: {
        type: String,
        required: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    projectID: {
        type: String,
        required: false
    },
    redAmount: {
        type: Number,
        required: false
    }

});

transaction.index({userID: 1, activityID: 1}, {unique: true})


var Transaction = module.exports = mongoose.model('Transaction', transaction)

module.exports.get = function (callback) {
    Transaction.find(callback)
}
