const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    
    userID: {
        type: String
    },
    name: {
        type: String,
        required: false
    },
    fon: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    activity: {
        type: Array,
        required : false
   },
    project: {
        type: Array,
        required : false
    },
    transaction: {
        type: Array,
        required : false
    },
    balance: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    currency: {
        type: String,
        default: 'EUR'
    },
    id: {
        type: String
    },
    paypalName: {
        type: String,
        default: "myPaypalName",
        required: false
    }
});

var User = module.exports = mongoose.model('User', userSchema)

module.exports.get = function(callback) {
    User.find(callback)
}

//module.exports = mongoose.model('User', userSchema);