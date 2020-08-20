const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    departments: {
        type: Array,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

mongoose.model('products', Product);