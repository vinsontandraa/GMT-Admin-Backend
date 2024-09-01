const mongoose = require('mongoose');

const MitraSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    no: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Mitra', MitraSchema);
