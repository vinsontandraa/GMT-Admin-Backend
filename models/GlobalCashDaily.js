const mongoose = require('mongoose');

const globalCashDailySchema = new mongoose.Schema({
    tanggal: { type: Date, required: true },
    noPlat: { type: String, required: true },
    kode: { type: String, required: true },
    mitra: { type: String, required: true },
    id: { type: String, required: true },
    voucher: { type: String, required: true },
    jenis: { type: String, required: true },
    keterangan: { type: String },
    PJ: { type: String },
    kasKeluar: { type: Number, default: 0 },
    kasMasuk: { type: Number, default: 0 },
    saldo: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('GlobalCashDaily', globalCashDailySchema);
