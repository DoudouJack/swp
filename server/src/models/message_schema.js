var mongoose = require('mongoose');

var message = mongoose.Schema({
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toUTCString()
    }
});

message.index({userID: 1}, {unique: true})


var Message = module.exports = mongoose.model('Message', message)

module.exports.get = function (callback) {
    Message.find(callback)
}