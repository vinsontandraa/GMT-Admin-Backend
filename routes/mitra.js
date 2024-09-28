const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mitra = require('../models/Mitra');

const upload = multer({ dest: 'uploads/' }); // Save uploads in the 'uploads' directory

// Create a new Mitra entry
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { body, files } = req;
    const imagePaths = files.map(file => file.path);
    const mitraData = { ...body, upload: imagePaths };
    const newMitra = new Mitra(mitraData);
    await newMitra.save();
    res.status(201).json(newMitra);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create mitra' });
  }
});

// Fetch all Mitra entries
router.get('/', async (req, res) => {
  try {
    const mitraList = await Mitra.find();
    res.status(200).json(mitraList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mitra' });
  }
});

// Update a Mitra entry
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { body, files } = req;
    const imagePaths = files.map(file => file.path);
    const mitraData = { ...body, upload: imagePaths };
    const updatedMitra = await Mitra.findByIdAndUpdate(req.params.id, mitraData, { new: true });
    res.status(200).json(updatedMitra);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update mitra' });
  }
});

// Delete a Mitra entry
router.delete('/:id', async (req, res) => {
  try {
    await Mitra.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Mitra deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete mitra' });
  }
});

module.exports = router;
