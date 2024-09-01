const mongoose = require("mongoose");

const dataSuratKendaraanSchema = new mongoose.Schema({
  no: { type: String, required: true },
  tanggal: { type: Date, required: true },
  noPlat: { type: String, required: true },
  ekspedisi: { type: String, required: true },
  vendor: { type: String, required: true },
  perubahan: { type: String, required: true },
  keterangan: { type: String, required: true },
  harga: { type: Number, required: true },
  exp: { type: String, required: true },
  tagihan: { type: Number, required: true },
  tglLunas: { type: Date, required: true },
  nominal: { type: Number, required: true },
  noRef: { type: String, required: true },
});

module.exports = mongoose.model("DataSuratKendaraan", dataSuratKendaraanSchema);
