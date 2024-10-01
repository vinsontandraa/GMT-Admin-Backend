const mongoose = require('mongoose');

const LakalantasSchema = new mongoose.Schema({
    tanggalKejadian: {
        type: Date,
        required: true
    },
    noLaka: {
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
    lokasi: {
        type: String,
        required: true
    },
    kronologi: {
        type: String,
        required: true
    },
    penyelesaian: {
        type: String,
        required: true
    },
    rpRincianBiayaLaka: {
        type: Number,
        required: true
    },
    keteranganRincianBiayaLaka: {
        type: String,
        required: true
    },
    noRefRincianBiayaLaka: {
        type: Number,
        required: true
    },
    tanggalRincianBiayaLaka: {
        type: Date,
        required: true
    },
    rpOlehSupir: {
        type: Number,
        required: true
    },
    rpOlehPerusahaan: {
        type: Number,
        required: true
    },
    upload: {
        type: String,
        required: true
    },
    tglPerbaikanYgDibutuhkan: {
        type: Date,
        required: true
    },
    noReportPerbaikanYgDibutuhkan: {
        type: Number,
        required: true
    },
    tglSelesai: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Lakalantas', LakalantasSchema);
