const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = require('./Item').ItemSchema;

const CategorySchema = new Schema ({
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    name: {
        type: String,
        required: true
    },
    items: [ItemSchema]
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    CategorySchema: CategorySchema,
    Category: Category
}

