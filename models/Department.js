const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Department = new Schema({
    name: {
        type: String,
        required: true
    }
});

mongoose.model('departments', Department);