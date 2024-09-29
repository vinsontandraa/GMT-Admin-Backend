const express = require('express');
const router = express.Router();
const Sparepart = require('../models/Sparepart');

// Create Sparepart
router.post('/', async (req, res) => {
    try {
        const newSparepart = new Sparepart({
            noId: generateNoId(), // Auto-generated ID
            namaProduk: req.body.namaProduk,
            tipe: req.body.tipe,
            satuan: req.body.satuan,
            jumlah: req.body.jumlah,
            supplier: req.body.supplier,
            merek: req.body.merek,
        });
        const savedSparepart = await newSparepart.save();
        res.status(200).json(savedSparepart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all Spareparts
router.get('/', async (req, res) => {
    try {
        const spareparts = await Sparepart.find();
        res.status(200).json(spareparts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Sparepart
router.put('/:id', async (req, res) => {
    try {
        const updatedSparepart = await Sparepart.findByIdAndUpdate(
            req.params.id,
            {
                namaProduk: req.body.namaProduk,
                tipe: req.body.tipe,
                satuan: req.body.satuan,
                jumlah: req.body.jumlah,
                supplier: req.body.supplier,
                merek: req.body.merek,
            },
            { new: true }
        );
        res.status(200).json(updatedSparepart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Sparepart
router.delete('/:id', async (req, res) => {
    try {
        await Sparepart.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Sparepart deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Helper function to generate a unique ID
function generateNoId() {
    return 'SP-' + Date.now();
}

module.exports = router;
