const express = require('express');
const NoPO = require('../models/NoPO'); // Adjust path as necessary

const router = express.Router();

// Create No PO
router.post('/noPO', async (req, res) => {
    try {
        const { noPlat, supplier } = req.body;
        const newNoPO = new NoPO({ noPlat, supplier });
        await newNoPO.save();
        res.status(201).json(newNoPO);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all No PO
router.get('/noPO', async (req, res) => {
    try {
        const noPOs = await NoPO.find();
        res.json(noPOs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
    
module.exports = router;
