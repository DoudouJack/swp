var mongoose = require('mongoose');

var activity = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    date: {
        type: String,
        default: new Date().toUTCString()
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
    },
    greenAmount: {
        type: Number,
        required: false
    },
    redAmount: {
        type: Number,
        required: false
    },
    creator: {
        type: String,
        required: true
    },
    payLink: {
        type: String,
        required: false
    },
    customDate:{
        type: String,
        default:  new Date().toUTCString()
    },
    transactions: {
        type: Array,
        required: false
    }
    
});

activity.index({projectID: 1, _id: 1}, {unique: true})


var Activity = module.exports = mongoose.model('activities', activity)

module.exports.get = function (callback) {
    Activity.find(callback)
}
