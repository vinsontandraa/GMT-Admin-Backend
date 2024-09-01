const mongoose = require("mongoose");

const sparePartPOSchema = new mongoose.Schema({
  No: { type: String, required: true },
  Tanggal: { type: Date, required: true },
  NoForm: { type: String, required: true },
  NoPO: { type: String, required: true },
  NoPlat: { type: String, required: true },
  Kode: { type: String, required: true },
  Supplier: { type: String, required: true },
  Produk: { type: String, required: true },
  Tipe: { type: String, required: true },
  satuan: { type: String, required: true },
  qty: { type: Number, required: true },
  upload: { type: String, required: true },
  Merek: { type: String, required: true },
  qtyKetersediaan: { type: Number, required: true },
  Keterangan: { type: String, required: true }
});

module.exports = mongoose.model("SparePartPO", sparePartPOSchema);
