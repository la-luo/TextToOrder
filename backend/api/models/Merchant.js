const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = require('./Item').ItemSchema;
const OrderSchema = require('./Order').OrderSchema;

const MerchantSchema = new Schema({
    storename: {
        type: String,
        index: true
    },
    address: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        index: true
    },
    phone: {
        type: Number,
        index: true
    },
    intro: {
        type: String
    },
    password: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: false
    },
    pin: {
        type: String,
        required: true
    },
    orders: [OrderSchema],
    items: [ItemSchema]
}, {
    versionKey: false 
});

const Merchant = mongoose.model('Merchant', MerchantSchema);

module.exports = Merchant;
