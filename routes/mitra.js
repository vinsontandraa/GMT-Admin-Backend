const express = require('express');
const router = express.Router();
const Mitra = require('../models/Mitra');

// Create a new Mitra
router.post('/', async (req, res) => {
    try {
        const newMitra = new Mitra(req.body);
        await newMitra.save();
        res.status(201).json(newMitra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Mitras
router.get('/', async (req, res) => {
    try {
        const mitras = await Mitra.find();
        res.json(mitras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a Mitra by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMitra = await Mitra.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMitra) return res.status(404).json({ message: 'Mitra not found' });
        res.json(updatedMitra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a Mitra by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMitra = await Mitra.findByIdAndDelete(req.params.id);
        if (!deletedMitra) return res.status(404).json({ message: 'Mitra not found' });
        res.json({ message: 'Mitra deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
