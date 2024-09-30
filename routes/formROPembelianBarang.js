// routes/formROPembelianBarang.js

const express = require('express');
const router = express.Router();
const FormROPembelianBarang = require('../models/FormROPembelianBarang'); // Add your model

// Create new Form RO entry
router.post('/generateFromPO', async (req, res) => {
    try {
        const { noPO, tanggal, supplier, merek, produk, tipe, satuan, qty, upload } = req.body;

        // Auto-generate No RO
        const noRO = generateNoRO();

        const newFormRO = new FormROPembelianBarang({
            noPO,
            tanggal,
            supplier,
            merek,
            produk,
            tipe,
            satuan,
            qty,
            upload,
            noRO  // auto-generated RO number
        });

        const savedFormRO = await newFormRO.save();
        res.status(201).json(savedFormRO);
    } catch (err) {
        console.error('Error generating Form RO:', err);
        res.status(500).json({ error: 'Failed to generate Form RO Pembelian Barang' });
    }
});

// Initialize RO counter (this would ideally be persisted in the database)
let roCounter = 1000; // Starting point for RO counter

// Function to generate No RO in the format "ROXXXX"
const generateNoRO = () => {
    roCounter++;  // Increment the counter
    return `RO-${roCounter.toString().padStart(4, '0')}`; // RO number padded to 4 digits
};

// Get all Form PO
router.get('/', async (req, res) => {
    try {
      const formROs = await FormROPembelianBarang.find();
      res.json(formROs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

module.exports = router;
