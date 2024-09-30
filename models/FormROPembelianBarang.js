// models/FormROPembelianBarang.js

const mongoose = require('mongoose');

const FormROPembelianBarangSchema = new mongoose.Schema({
    no: { type: int, required: true },
    noPO: { type: String, required: true },
    tanggal: { type: Date, required: true },
    supplier: { type: String, required: true },
    merek: { type: String, required: true },
    produk: { type: String, required: true },
    tipe: { type: String, required: true },
    satuan: { type: String, required: true },
    qty: { type: Number, required: true },
    upload: { type: String, required: true },
    noRO: { type: String, required: true, unique: true } // Auto-generated No RO
});

module.exports = mongoose.model('FormROPembelianBarang', FormROPembelianBarangSchema);
