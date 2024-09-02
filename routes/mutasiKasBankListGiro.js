const express = require("express");
const router = express.Router();
const MutasiKasBankListGiro = require("../models/MutasiKasBankListGiro");

// GET all entries
router.get("/", async (req, res) => {
  try {
    const entries = await MutasiKasBankListGiro.find();
    res.json(entries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CREATE a new entry
router.post("/", async (req, res) => {
  const { no, namaBank, noRef, keterangan, debit } = req.body;

  const newEntry = new MutasiKasBankListGiro({
    no,
    namaBank,
    noRef,
    keterangan,
    debit,
  });

  try {
    const savedEntry = await newEntry.save();
    res.json(savedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE an existing entry by ID
router.put("/:id", async (req, res) => {
  const { no, namaBank, noRef, keterangan, debit } = req.body;

  try {
    const updatedEntry = await MutasiKasBankListGiro.findByIdAndUpdate(
      req.params.id,
      { no, namaBank, noRef, keterangan, debit },
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
    await MutasiKasBankListGiro.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
