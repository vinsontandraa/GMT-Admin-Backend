const express = require('express');
const router = express.Router();
const Mekanik = require('../models/Mekanik');

// Create a new Mekanik
router.post('/', async (req, res) => {
    try {
        const newMekanik = new Mekanik(req.body);
        await newMekanik.save();
        res.status(201).json(newMekanik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Mekaniks
router.get('/', async (req, res) => {
    try {
        const Mekaniks = await Mekanik.find();
        res.json(Mekaniks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a Mekanik by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMekanik = await Mekanik.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMekanik) return res.status(404).json({ message: 'Mekanik not found' });
        res.json(updatedMekanik);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a Mekanik by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMekanik = await Mekanik.findByIdAndDelete(req.params.id);
        if (!deletedMekanik) return res.status(404).json({ message: 'Mekanik not found' });
        res.json({ message: 'Mekanik deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
