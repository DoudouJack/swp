var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    transactionID: String,
    dateOfPayment: String,
    activityID: String,
    userID: String,
    amount: String,
    currency: String,
    isPaid: Boolean
});


module.exports = {
    transactionSchema
}