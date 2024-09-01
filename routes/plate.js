const express = require('express');
const router = express.Router();
const Plate = require('../models/Plate');

// Create a new plate
router.post('/', async (req, res) => {
    try {
        const { noPlat } = req.body;
        const plate = new Plate({ noPlat });
        await plate.save();
        res.status(201).json(plate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all plates
router.get('/', async (req, res) => {
    try {
        const plates = await Plate.find();
        res.json(plates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single plate by ID
router.get('/:id', async (req, res) => {
    try {
        const plate = await Plate.findById(req.params.id);
        if (!plate) return res.status(404).json({ error: 'Plate not found' });
        res.json(plate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a plate by ID
router.put('/:id', async (req, res) => {
    try {
        const { noPlat } = req.body;
        const plate = await Plate.findByIdAndUpdate(req.params.id, { noPlat }, { new: true });
        if (!plate) return res.status(404).json({ error: 'Plate not found' });
        res.json(plate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a plate by ID
router.delete('/:id', async (req, res) => {
    try {
        const plate = await Plate.findByIdAndDelete(req.params.id);
        if (!plate) return res.status(404).json({ error: 'Plate not found' });
        res.json({ message: 'Plate deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
