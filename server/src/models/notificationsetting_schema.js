var mongoose = require('mongoose');

var notificationsetting = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    notificationTurnOn: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        default: new Date().toUTCString()
    }
});

notificationsetting.index({userID: 1}, {unique: true})


var Notificationsetting = module.exports = mongoose.model('Notificationsetting', notificationsetting)

module.exports.get = function (callback) {
    Notificationsetting.find(callback)
}