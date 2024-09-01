const mongoose = require("mongoose");

const mutasiKasBankListGiroSchema = new mongoose.Schema({
  no: { type: String, required: true },
  namaBank: { type: String, required: true },
  noRef: { type: String, required: true },
  keterangan: { type: String, required: true },
  debit: { type: Number, required: true },
});

module.exports = mongoose.model("MutasiKasBankListGiro", mutasiKasBankListGiroSchema);
