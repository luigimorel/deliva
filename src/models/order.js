const mongo = require('mongoose');

const Schema = mongo.Schema;

const orderSchema = new Schema({
    orderTime: String,
    orderCost: Number,
    orderTime: String,
});

module.exports = mongo.model('Order', orderSchema);
