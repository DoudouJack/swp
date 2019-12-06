const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String},
    fon: {type: Number},
    email: {type: String},
    activity: {type: Array},
    project: {type: Array},
    transaction: {type: Array},
    balance: {type: Number},
    active: {type: Boolean}
});

module.exports = mongoose.model('User', UserSchema);