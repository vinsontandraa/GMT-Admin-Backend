const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const mutasiKasBankSchema = new mongoose.Schema({
  tanggal: { type: Date, required: true },
  noPlat: { type: String, required: true },
  kode: { type: String, required: true },
  mitra: { type: String, required: true },
  id: { type: String, required: true },
  noRef: { type: String, required: true },
  jenis: { type: String, required: true },
  keterangan: { type: String },
  kasKeluar: { type: Number, required: true },
  kasMasuk: { type: Number, required: true },
  saldo: { type: Number, required: true },
  namaBank: { type: String, required: true },
  noRekening: { type: String, required: true },
  namaRekening: { type: String, required: true },
});

const MutasiKasBank = mongoose.model("MutasiKasBank", mutasiKasBankSchema);

// Get all entries
router.get("/", async (req, res) => {
  try {
    const entries = await MutasiKasBank.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new entry
router.post("/", async (req, res) => {
  const newEntry = new MutasiKasBank(req.body);
  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an entry
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await MutasiKasBank.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  try {
    await MutasiKasBank.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
