const express = require('express');
const router = express.Router();
const GlobalCashDaily = require('../models/GlobalCashDaily');

// Create a new entry
router.post('/', async (req, res) => {
    try {
        const entry = new GlobalCashDaily(req.body);
        await entry.save();
        res.status(201).json(entry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read all entries
router.get('/', async (req, res) => {
    try {
        const entries = await GlobalCashDaily.find();
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read a single entry by ID
router.get('/:id', async (req, res) => {
    try {
        const entry = await GlobalCashDaily.findById(req.params.id);
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an entry by ID
router.put('/:id', async (req, res) => {
    try {
        const entry = await GlobalCashDaily.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        res.json(entry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const entry = await GlobalCashDaily.findByIdAndDelete(req.params.id);
        if (!entry) return res.status(404).json({ error: 'Entry not found' });
        res.json({ message: 'Entry deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
