const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    totalPrice: {
        type: Number,
        min: 0
    },
    timestamps: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = {
    OrderSchema: OrderSchema,
    Order: Order
};
