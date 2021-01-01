const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = require('./Item').ItemSchema;

const OrderSchema = new Schema({
    total: {
        type: Number,
        min: 0
    },
    timestamps: {
        type: Date,
        default: Date.now
    },
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    items: {
        type: [String],
        required: true
    }
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
}, {
    versionKey: false 
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = {
    OrderSchema: OrderSchema,
    Order: Order
};
