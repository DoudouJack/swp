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
        default: false
    },
    activityType: {
        type: Boolean,
        default: false
    }
});

activity.index({projectID: 1, activityID: 1}, {unique: true})
activity.index({activityID: 1},{unique: true})


var Activity = module.exports = mongoose.model('activities', activity)

module.exports.get = function (callback) {
    Activity.find(callback)
}
