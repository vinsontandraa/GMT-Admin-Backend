const express = require("express");
const router = express.Router();
const DataSuratKendaraan = require("../models/DataSuratKendaraan");

// GET all entries
router.get("/", async (req, res) => {
  try {
    const entries = await DataSuratKendaraan.find();
    res.json(entries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CREATE a new entry
router.post("/", async (req, res) => {
  const {
    no, tanggal, noPlat, ekspedisi, vendor, perubahan, keterangan,
    harga, exp, tagihan, tglLunas, nominal, noRef,
  } = req.body;

  const newEntry = new DataSuratKendaraan({
    no,
    tanggal,
    noPlat,
    ekspedisi,
    vendor,
    perubahan,
    keterangan,
    harga,
    exp,
    tagihan,
    tglLunas,
    nominal,
    noRef,
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
  const {
    no, tanggal, noPlat, ekspedisi, vendor, perubahan, keterangan,
    harga, exp, tagihan, tglLunas, nominal, noRef,
  } = req.body;

  try {
    const updatedEntry = await DataSuratKendaraan.findByIdAndUpdate(
      req.params.id,
      {
        no,
        tanggal,
        noPlat,
        ekspedisi,
        vendor,
        perubahan,
        keterangan,
        harga,
        exp,
        tagihan,
        tglLunas,
        nominal,
        noRef,
      },
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
    await DataSuratKendaraan.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
