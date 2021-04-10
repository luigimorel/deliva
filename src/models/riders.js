const mongo = require('mongoose');

const Schema = mongo.Schema;

const riderSchema = new Schema({
    firstName: String,
    lastName: String,
    orderDelivered: String,
    phoneNumber: String,
    riderId: Number,
});

module.exports = mongo.model('Rider', riderSchema);
