const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
    merchant: {
        type: Schema.Types.ObjectId,
        ref: 'Merchant'
    },
    name: {
        type: String,
        required: true
    },
    items: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }
});

module.exports = mongoose.model('Category', CategorySchema);


