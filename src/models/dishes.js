const mongo = require('mongoose');

const Schema = mongo.Schema;

const dishSchema = new Schema({
    name: String,
    country: String,
    tasty: Boolean,
    chefsId: Number,
    price: Number,
});

module.exports = mongo.model('Dish', dishSchema);
