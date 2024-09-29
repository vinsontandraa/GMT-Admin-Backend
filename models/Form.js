const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formId: {
        type: String,
        required: true,
        unique: true,
    },
    platId: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
