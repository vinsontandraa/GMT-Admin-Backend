const express = require('express');
const router = express.Router();
const Jenis = require('../models/Jenis');

// Get all Jenis
router.get('/', async (req, res) => {
    try {
        const jenis = await Jenis.find();
        res.json(jenis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new Jenis
router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const newJenis = new Jenis({ name });
        await newJenis.save();
        res.status(201).json(newJenis);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an existing Jenis
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedJenis = await Jenis.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedJenis) {
            return res.status(404).json({ error: 'Jenis not found' });
        }
        res.json(updatedJenis);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Jenis
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedJenis = await Jenis.findByIdAndDelete(id);
        if (!deletedJenis) {
            return res.status(404).json({ error: 'Jenis not found' });
        }
        res.json({ message: 'Jenis deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
