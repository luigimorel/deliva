const mongo = require('mongoose');

const Schema = mongo.Schema;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    order: String,
    location: String,
    phoneNumber: String,
    emailAddress: String,
    customerId: Number,
});

module.exports = mongo.model('Customer', customerSchema);
