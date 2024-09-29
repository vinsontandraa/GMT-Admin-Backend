const mongoose = require('mongoose');

const sparepartSchema = new mongoose.Schema({
    noId: { type: String, required: true, unique: true }, // Auto-generated
    namaProduk: { type: String, required: true },
    tipe: { type: String, required: true },
    satuan: { type: String, required: true },
    jumlah: { type: Number, required: true },
    supplier: { type: String, required: true },
    merek: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sparepart', sparepartSchema);
