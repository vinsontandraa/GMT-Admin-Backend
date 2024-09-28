const mongoose = require('mongoose');

const mitraSchema = new mongoose.Schema({
    no: { type: Number, required: true },
    noId: { type: String, required: true, unique: true },
    namaLengkap: { type: String, required: true },
    namaAlias: { type: String },
    noSIM: { type: String },
    jenisSIM: { type: String },
    exp: { type: Date },
    noKTP: { type: String },
    noKK: { type: String },
    tglLahir: { type: Date },
    agama: { type: String },
    status: { type: String },
    tglJoin: { type: Date },
    noHp: { type: String },
    email: { type: String },
    namaBank: { type: String },
    noRekening: { type: String },
    namaRekening: { type: String },
    upload: { type: [String] }, // Array of file paths for images
    keterangan: { type: String }
}, { timestamps: true });

const Mitra = mongoose.model('Mitra', mitraSchema);
module.exports = Mitra;
