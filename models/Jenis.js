const mongoose = require('mongoose');

const jenisSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Jenis', jenisSchema);
