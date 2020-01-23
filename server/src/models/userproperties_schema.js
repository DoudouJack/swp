var mongoose = require('mongoose');

var userproperties = mongoose.Schema({
    date: {
        type: String,
        default: new Date().toUTCString()
    },
    userToken: {
        type: String,
        required: true
    },
    messageToken: {
        type: String,
        required: true
    }
});

userproperties.index({userToken: 1, messageToken: 1}, {unique: true})


var Userproperties = module.exports = mongoose.model('Userproperties', userproperties)

module.exports.get = function (callback) {
    Userproperties.find(callback)
}