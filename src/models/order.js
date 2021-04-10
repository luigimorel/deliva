const mongo = require('mongoose');
const { GraphQLDate } = require('graphql-iso-date');

const Schema = mongo.Schema;

const orderSchema = new Schema({
    timeOrderPlaced,
    orderCost: Number,
    estimatedDeliveryTime,
    deliveryDistance: Number,
    deliveryLocation: String,
});

module.exports = mongo.model('Order', orderSchema);
