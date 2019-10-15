const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    description: {
        type: String
    }
});

const Item  = mongoose.model('Item', ItemSchema);
module.exports = {
    ItemSchema: ItemSchema,
    Item: Item
};