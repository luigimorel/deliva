const mongo = require('mongoose');

const Schema = mongo.Schema;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emailAddress: String,
    location: String,
    order: String
});

module.exports = mongo.model('Customer', customerSchema);
