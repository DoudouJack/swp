var mongoose = require('mongoose');

var activity = mongoose.Schema({
    activityID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    member: {
        type: Array,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    splitAmount: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    projectID: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    activityType: {
        type: Boolean,
        required: false
    }

});


var Activity = module.exports = mongoose.model('Activity', activity)

module.exports.get = function (callback) {
    Activity.find(callback)
}
