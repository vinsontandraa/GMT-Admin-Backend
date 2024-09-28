const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mitra = require('../models/Mitra'); // Import your Mitra model

// Multer setup for file uploads (if needed)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set your upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Get all Mitra data
router.get('/', async (req, res) => {
    try {
        const mitras = await Mitra.find();
        res.json(mitras);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new Mitra entry
router.post('/', upload.array('upload'), async (req, res) => {
    const mitraData = {
        no: req.body.no,
        namaLengkap: req.body.namaLengkap,
        namaAlias: req.body.namaAlias,
        noSim: req.body.noSim,
        jenisSim: req.body.jenisSim,
        expSim: req.body.expSim,
        noKtp: req.body.noKtp,
        noKk: req.body.noKk,
        tglLahir: req.body.tglLahir,
        agama: req.body.agama,
        status: req.body.status,
        tglJoin: req.body.tglJoin,
        noHp: req.body.noHp,
        email: req.body.email,
        namaBank: req.body.namaBank,
        noRekening: req.body.noRekening,
        namaRekening: req.body.namaRekening,
        keterangan: req.body.keterangan,
        images: req.files.map(file => file.filename), // Save filenames of uploaded images
    };

    const newMitra = new Mitra(mitraData);

    try {
        const savedMitra = await newMitra.save();
        res.status(201).json(savedMitra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing Mitra entry (EDIT)
router.put('/:id', upload.array('upload'), async (req, res) => {
    try {
        const mitra = await Mitra.findById(req.params.id);
        if (!mitra) return res.status(404).json({ message: 'Mitra not found' });

        // Update fields
        mitra.no = req.body.no || mitra.no;
        mitra.namaLengkap = req.body.namaLengkap || mitra.namaLengkap;
        mitra.namaAlias = req.body.namaAlias || mitra.namaAlias;
        mitra.noSim = req.body.noSim || mitra.noSim;
        mitra.jenisSim = req.body.jenisSim || mitra.jenisSim;
        mitra.expSim = req.body.expSim || mitra.expSim;
        mitra.noKtp = req.body.noKtp || mitra.noKtp;
        mitra.noKk = req.body.noKk || mitra.noKk;
        mitra.tglLahir = req.body.tglLahir || mitra.tglLahir;
        mitra.agama = req.body.agama || mitra.agama;
        mitra.status = req.body.status || mitra.status;
        mitra.tglJoin = req.body.tglJoin || mitra.tglJoin;
        mitra.noHp = req.body.noHp || mitra.noHp;
        mitra.email = req.body.email || mitra.email;
        mitra.namaBank = req.body.namaBank || mitra.namaBank;
        mitra.noRekening = req.body.noRekening || mitra.noRekening;
        mitra.namaRekening = req.body.namaRekening || mitra.namaRekening;
        mitra.keterangan = req.body.keterangan || mitra.keterangan;

        // Update uploaded images if there are new ones
        if (req.files && req.files.length > 0) {
            mitra.images = req.files.map(file => file.filename);
        }

        const updatedMitra = await mitra.save();
        res.json(updatedMitra);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an existing Mitra entry (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const mitra = await Mitra.findById(req.params.id);
        if (!mitra) return res.status(404).json({ message: 'Mitra not found' });

        await mitra.remove();
        res.json({ message: 'Mitra deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
