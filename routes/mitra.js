const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mitra = require('../models/Mitra');

// Multer config for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });
  
  // Route to handle POST request for Mitra creation with image upload
  app.post('/mitras', upload.array('images', 10), async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);
    try {
      const imageFiles = req.files.map(file => file.filename);
      const mitra = new Mitra({ ...req.body, images: imageFiles });
      await mitra.save();
      res.status(201).json(mitra);
    } catch (err) {
      console.error('Error creating Mitra:', err);
      res.status(500).json({ error: 'Server error while creating Mitra' });
    }
  });

  const fs = require('fs');
  const uploadsDir = 'uploads';
  if (!fs.existsSync(uploadsDir)){
      fs.mkdirSync(uploadsDir);
  }

// Create mitra
// router.post('/', upload.array('upload', 5), async (req, res) => {
//   try {
//     const { files } = req;
//     const filePaths = files.map(file => file.path);
//     const newMitra = new Mitra({ ...req.body, upload: filePaths });
//     await newMitra.save();
//     res.json(newMitra);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
      const updates = req.body;
      if (req.files) {
        updates.images = req.files.map(file => file.filename);
      }
      const mitra = await Mitra.findByIdAndUpdate(req.params.id, updates, { new: true });
      res.json(mitra);
    } catch (err) {
      res.status(400).json({ error: err.message });
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
