const mongoose = require('mongoose');

const formPOSchema = new mongoose.Schema({
  no: { type: String, required: true },
  tanggal: { type: Date, required: true },
  noForm: { type: String, required: true },
  noPO: { type: String, required: true },
  noPlat: { type: String, required: true },
  kode: { type: String, required: true },
  supplier: { type: String, required: true },
  produk: { type: String, required: true },
  tipe: { type: String, required: true },
  satuan: { type: String, required: true },
  qty: { type: Number, required: true },
  upload: { type: String, required: true },
  merek: { type: String, required: true },
  qtyKetersediaan: { type: Number, required: true },
  keterangan: { type: String }
});

module.exports = mongoose.model('FormPO', formPOSchema);
