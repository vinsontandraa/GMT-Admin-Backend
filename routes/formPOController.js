const express = require('express');
const router = express.Router();
const FormPO = require('../models/formPOModel');

// Create a new Form PO
router.post('/', async (req, res) => {
  try {
    const newPO = new FormPO(req.body);
    const savedPO = await newPO.save();
    res.json(savedPO);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Form PO
router.get('/', async (req, res) => {
  try {
    const formPOs = await FormPO.find();
    res.json(formPOs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single Form PO by ID
router.get('/:id', async (req, res) => {
  try {
    const formPO = await FormPO.findById(req.params.id);
    res.json(formPO);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Form PO
router.put('/:id', async (req, res) => {
  try {
    const updatedPO = await FormPO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPO);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Form PO
router.delete('/:id', async (req, res) => {
  try {
    await FormPO.findByIdAndDelete(req.params.id);
    res.json({ message: 'Form PO deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
