const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mitra = require('../models/Mitra');

// Multer config for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Create unique filename
    },
  });

  const upload = multer({ storage: storage });

  
  // Route to handle POST request for Mitra creation with image upload
  router.post('/', upload.array('upload', 5), async (req, res) => {
    try {
      // Handle the request here
      const files = req.files; // Access the uploaded files
      const body = req.body; // Access the other fields sent in the form
  
      // Your logic for saving the data to the database goes here
      
      res.status(200).json({ message: 'Files uploaded successfully!', files });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading files', error });
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
