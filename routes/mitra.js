const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mitra = require('../models/Mitra');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Create mitra
router.post('/', upload.array('upload', 5), async (req, res) => {
  try {
    const { files } = req;
    const filePaths = files.map(file => file.path);
    const newMitra = new Mitra({ ...req.body, upload: filePaths });
    await newMitra.save();
    res.json(newMitra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all mitras
router.get('/', async (req, res) => {
  try {
    const mitras = await Mitra.find();
    res.json(mitras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit mitra
router.put('/:id', upload.array('upload', 5), async (req, res) => {
  try {
    const { files } = req;
    const filePaths = files.map(file => file.path);
    const updatedMitra = await Mitra.findByIdAndUpdate(
      req.params.id,
      { ...req.body, upload: filePaths },
      { new: true }
    );
    res.json(updatedMitra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete mitra
router.delete('/:id', async (req, res) => {
  try {
    await Mitra.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mitra deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
