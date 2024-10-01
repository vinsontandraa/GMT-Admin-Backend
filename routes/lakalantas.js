const express = require('express');
const router = express.Router();
const Lakalantas = require('../models/Lakalantas');

// Create a new Lakalantas
router.post('/', async (req, res) => {
    try {
        const newLakalantas = new Lakalantas(req.body);
        await newLakalantas.save();
        res.status(201).json(newLakalantas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Lakalantases
router.get('/', async (req, res) => {
    try {
        const Lakalantases = await Lakalantas.find();
        res.json(Lakalantases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a Lakalantas by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedLakalantas = await Lakalantas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLakalantas) return res.status(404).json({ message: 'Lakalantas not found' });
        res.json(updatedLakalantas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a Lakalantas by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedLakalantas = await Lakalantas.findByIdAndDelete(req.params.id);
        if (!deletedLakalantas) return res.status(404).json({ message: 'Lakalantas not found' });
        res.json({ message: 'Lakalantas deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
