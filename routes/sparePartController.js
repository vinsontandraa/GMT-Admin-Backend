// routes/spareparts.js
const express = require('express');
const router = express.Router();
const Sparepart = require('../models/Sparepart');
const FormPO = require('../models/formPOModel');

// Get all spareparts
router.get('/', async (req, res) => {
    try {
        const spareparts = await Sparepart.find();
        res.json(spareparts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get sparepart by ID
router.get('/:id', async (req, res) => {
    try {
        const sparepart = await Sparepart.findById(req.params.id);
        if (!sparepart) return res.status(404).json({ error: 'Sparepart not found' });
        res.json(sparepart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new sparepart (Admin)
router.post('/', async (req, res) => {
    try {
        const newSparepart = new Sparepart(req.body);
        await newSparepart.save();
        res.status(201).json(newSparepart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a sparepart (Supervisor Approval)
router.put('/:id', async (req, res) => {
    try {
        const { approved, yaTidakDitinjau, stokBeli, tanggalDitinjau, namaDitinjau, passwordDitinjau, mekanik, noSO, supplier, noPO, status } = req.body;
        const sparepart = await Sparepart.findById(req.params.id);
        if (!sparepart) return res.status(404).json({ error: 'Sparepart not found' });

        if (status === 'approved') {
            sparepart.approved = approved || sparepart.approved;
            sparepart.yaTidakDitinjau = yaTidakDitinjau || sparepart.yaTidakDitinjau;
            sparepart.stokBeli = stokBeli || sparepart.stokBeli;
            sparepart.tanggalDitinjau = tanggalDitinjau || sparepart.tanggalDitinjau;
            sparepart.namaDitinjau = namaDitinjau || sparepart.namaDitinjau;
            sparepart.passwordDitinjau = passwordDitinjau || sparepart.passwordDitinjau;
            sparepart.mekanik = mekanik || sparepart.mekanik;
            sparepart.noSO = noSO || sparepart.noSO;
            sparepart.supplier = supplier || sparepart.supplier;
            sparepart.noPO = noPO || sparepart.noPO;
            sparepart.status = 'approved';
            console.log(sparepart.no + "!!!!");
            console.log(sparepart.tanggal + "!!!!");

            const poForm = new FormPO({
                no: sparepart.no,
                tanggal: sparepart.tanggal,
                noForm: sparepart.noForm,
                noPO: sparepart.noPO, // Logic to generate the PO number
                noPlat: sparepart.noPlat,
                kode: sparepart.kode,
                supplier: 'a',
                produk: sparepart.produk,
                tipe: sparepart.tipe,
                satuan: sparepart.satuan,
                qty: sparepart.qty,
                upload: 'Upload link or document', // Handle file upload logic
                merek:'a',
                qtyKetersediaan: 0,
                keterangan: 'a'
             });
            
             await poForm.save()
             .then(() => console.log('POForm saved successfully'))
             .catch(err => console.error('Failed to save POForm:', err));
        } else {
            sparepart.status = 'rejected';
        }

        await sparepart.save();
        res.json(sparepart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const sparepart = await Sparepart.findById(req.params.id);
        if (!sparepart) return res.status(404).json({ error: 'Task not found' });

        // Update fields based on role
        const updatedData = {
            ...req.body,
            status: req.body.status || sparepart.status
        };

        const updatedSparepart = await Sparepart.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedSparepart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a sparepart
router.delete('/:id', async (req, res) => {
    try {
        const sparepart = await Sparepart.findByIdAndDelete(req.params.id);
        if (!sparepart) return res.status(404).json({ error: 'Sparepart not found' });
        res.json({ message: 'Sparepart deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
