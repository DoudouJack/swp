const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    userID: {type: String},
    name: {
        type: String,
        required: true
    },
    fon: {type: Number},
    email: {type: String},
    activity: {type: Array},
    project: {type: Array},
    transaction: {type: Array},
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
    }
});

module.exports = mongoose.model('User', UserSchema);