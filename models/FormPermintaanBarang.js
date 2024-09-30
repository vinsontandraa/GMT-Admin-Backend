// models/formPermintaanBarang.js
const mongoose = require('mongoose');

const FormPermintaanBarangSchema = new mongoose.Schema({
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
  yaTidakDitinjau: { type: String },
  stokBeli: { type: String },
  tanggalDitinjau: { type: Date },
  namaDitinjau: { type: String },
  passwordDitinjau: { type: String },
  mekanik: { type: String },
  noSO: { type: String, unique: true },  // Change to String
  supplier: { type: String },
  noPO: { type: String, unique: true },  // Change to String
  createdBy: { type: String, required: true }, // Added field for creator username
  firstApprovedBy: { type: String, default: null }, // First approver username
  secondApprovedBy: { type: String, default: null }, // Second approver username
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
});

formPermintaanBarangSchema.pre('save', async function(next) {
  if (!this.noPO) {
      const lastPO = await this.model('FormPermintaanBarang').findOne({}, {}, { sort: { noPO: -1 } });
      this.noPO = lastPO ? (parseInt(lastPO.noPO) + 1).toString() : '1'; // Convert to string
      this.noPO = "PO-" + this.noPO;
  }
  if (!this.noSO) {
      const lastSO = await this.model('FormPermintaanBarang').findOne({}, {}, { sort: { noSO: -1 } });
      this.noSO = lastSO ? (parseInt(lastSO.noSO) + 1).toString() : '1'; // Convert to string
      this.noSO = "SO-" + this.noSO;

  }
  next();
});

module.exports = mongoose.model('FormPermintaanBarang', FormPermintaanBarangSchema);
