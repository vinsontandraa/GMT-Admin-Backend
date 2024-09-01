const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Mongoose Schema for Mutasi Kas Bank Piutang
const mutasiKasBankPiutangSchema = new mongoose.Schema({
  tanggal: { type: Date, required: true },
  noRef: { type: String, required: true },
  noInvoice: { type: String, required: true },
  keterangan: { type: String, required: true },
  debit: { type: Number, required: true },
  kredit: { type: Number, required: true },
  saldo: { type: Number, required: true },
  namaPengirim: { type: String, required: true },
});

const MutasiKasBankPiutang = mongoose.model(
  "MutasiKasBankPiutang",
  mutasiKasBankPiutangSchema
);

// GET all entries
router.get("/", async (req, res) => {
  try {
    const entries = await MutasiKasBankPiutang.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new entry
router.post("/", async (req, res) => {
  const newEntry = new MutasiKasBankPiutang(req.body);
  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update an entry by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await MutasiKasBankPiutang.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE an entry by ID
router.delete("/:id", async (req, res) => {
  try {
    await MutasiKasBankPiutang.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
