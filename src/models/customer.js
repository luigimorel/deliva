const mongo = require('mongoose');

const Schema = mongo.Schema;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    emailAddress: string,
    location: String,
});

module.exports = mongo.model('Customer', customerSchema);
