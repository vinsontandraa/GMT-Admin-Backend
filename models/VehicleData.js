const mongoose = require('mongoose');

const vehicleDataSchema = new mongoose.Schema({
    ekspedisi: { type: String, required: true },
    noPlat: { type: String, required: true },
    notes: { type: String, required: true },
    bpkbNo: { type: String, required: true },
    merek: { type: String, required: true },
    tahunPembuatan: { type: Number, default: 0 },
    noRangka: { type: String, required: true },
    upload: { type: String },
    keteranganKendaraan: { type: String },
    stnkNo: { type: Number, default: 0 },
    tanggalBeli: { type: Date },
    namaPenjual: { type: String },
    hargaBeli: { type: Number, default: 0 },
    pembayaranPembelian: { type: Number, default: 0 },
    keteranganPembelian: { type: String },
    tanggalJual: { type: Date },
    namaPembeli: { type: String },
    hargaJual: { type: Number, default: 0 },
    pembayaranPenjualan: { type: Number, default: 0 },
    keteranganPenjualan: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('VehicleData', vehicleDataSchema);
