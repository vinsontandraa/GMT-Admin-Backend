const mongoose = require('mongoose');

const MekanikSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        required: true
    },
    noForm: {
        type: String,
        required: true
    },
    noSO: {
        type: String,
        required: true
    },
    mekanik: {
        type: String,
        required: true
    },
    noPlat: {
        type: String,
        required: true
    },
    ekspedisi: {
        type: String,
        required: true
    },
    namaMitra: {
        type: String,
        required: true
    },
    noID: {
        type: Number,
        required: true
    },
    perbaikan: {
        type: String,
        required: true
    },
    borong: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mekanik', MekanikSchema);
