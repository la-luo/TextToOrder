const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    name: {
        type: String,
        require: true
    },
    categoryName: {
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

module.exports = mongoose.model('Item', ItemSchema);