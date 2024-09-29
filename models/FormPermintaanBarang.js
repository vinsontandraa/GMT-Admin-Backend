// models/formPermintaanBarang.js
const mongoose = require('mongoose');

const formPermintaanBarangSchema = new mongoose.Schema({
  no: { type: String, required: true },
  tanggal: { type: Date, required: true },
  noForm: { type: String, required: true },
  noPlat: { type: String, required: true },
  kode: { type: String, required: true },
  namaMitra: { type: String, required: true },
  noID: { type: String, required: true },
  tujuanPermintaan: { type: String, required: true },
  masalah: { type: String, required: true },
  solusi: { type: String, required: true },
  diDiagnosaOleh: { type: String, required: true },
  yaTidak: { type: String, required: true },
  produk: { type: String, required: true },
  tipe: { type: String, required: true },
  satuan: { type: String, required: true },
  qty: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  yaTidakDitinjau: { type: String },
  stokBeli: { type: String },
  tanggalDitinjau: { type: Date },
  namaDitinjau: { type: String },
  passwordDitinjau: { type: String },
  mekanik: { type: String },
  noSO: { type: String },
  supplier: { type: String },
  noPO: { type: String }
});

module.exports = mongoose.model('formPermintaanBarang', formPermintaanBarangSchema);
