// routes/formPermintaanBarangs.js
const express = require('express');
const router = express.Router();
const FormPermintaanBarang = require('../models/FormPermintaanBarang');
const FormPO = require('../models/formPOModel');

// Get all formPermintaanBarangs
router.get('/', async (req, res) => {
    try {
        const formPermintaanBarang = await FormPermintaanBarang.find();
        res.json(formPermintaanBarang);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get formPermintaanBarang by ID
router.get('/:id', async (req, res) => {
    try {
        const formPermintaanBarang = await FormPermintaanBarang.findById(req.params.id);
        if (!formPermintaanBarang) return res.status(404).json({ error: 'formPermintaanBarang not found' });
        res.json(formPermintaanBarang);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new formPermintaanBarang (Admin)
router.post('/', async (req, res) => {
    try {
        const newformPermintaanBarang = new FormPermintaanBarang(req.body);
        await newformPermintaanBarang.save();
        res.status(201).json(newformPermintaanBarang);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a formPermintaanBarang (Supervisor Approval)
router.put('/:id', async (req, res) => {
    try {
        const { approved, yaTidakDitinjau, stokBeli, tanggalDitinjau, namaDitinjau, passwordDitinjau, mekanik, noSO, supplier, noPO, status } = req.body;
        const formPermintaanBarang = await FormPermintaanBarang.findById(req.params.id);
        if (!formPermintaanBarang) return res.status(404).json({ error: 'formPermintaanBarang not found' });

        if (status === 'approved') {
            formPermintaanBarang.approved = approved || formPermintaanBarang.approved;
            formPermintaanBarang.yaTidakDitinjau = yaTidakDitinjau || formPermintaanBarang.yaTidakDitinjau;
            formPermintaanBarang.stokBeli = stokBeli || formPermintaanBarang.stokBeli;
            formPermintaanBarang.tanggalDitinjau = tanggalDitinjau || formPermintaanBarang.tanggalDitinjau;
            formPermintaanBarang.namaDitinjau = namaDitinjau || formPermintaanBarang.namaDitinjau;
            formPermintaanBarang.passwordDitinjau = passwordDitinjau || formPermintaanBarang.passwordDitinjau;
            formPermintaanBarang.mekanik = mekanik || formPermintaanBarang.mekanik;
            formPermintaanBarang.noSO = noSO || formPermintaanBarang.noSO;
            formPermintaanBarang.supplier = supplier || formPermintaanBarang.supplier;
            formPermintaanBarang.noPO = noPO || formPermintaanBarang.noPO;
            formPermintaanBarang.status = 'approved';
            console.log(formPermintaanBarang.no + "!!!!");
            console.log(formPermintaanBarang.tanggal + "!!!!");

            const poForm = new FormPO({
                no: formPermintaanBarang.no,
                tanggal: formPermintaanBarang.tanggal,
                noForm: formPermintaanBarang.noForm,
                noPO: formPermintaanBarang.noPO, // Logic to generate the PO number
                noPlat: formPermintaanBarang.noPlat,
                kode: formPermintaanBarang.kode,
                supplier: 'a',
                produk: formPermintaanBarang.produk,
                tipe: formPermintaanBarang.tipe,
                satuan: formPermintaanBarang.satuan,
                qty: formPermintaanBarang.qty,
                upload: 'Upload link or document', // Handle file upload logic
                merek:'a',
                qtyKetersediaan: 0,
                keterangan: 'a'
             });
            
             await poForm.save()
             .then(() => console.log('POForm saved successfully'))
             .catch(err => console.error('Failed to save POForm:', err));
        } else {
            formPermintaanBarang.status = 'rejected';
        }

        await formPermintaanBarang.save();
        res.json(formPermintaanBarang);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const formPermintaanBarang = await FormPermintaanBarang.findById(req.params.id);
        if (!formPermintaanBarang) return res.status(404).json({ error: 'Task not found' });

        // Update fields based on role
        const updatedData = {
            ...req.body,
            status: req.body.status || formPermintaanBarang.status
        };

        const updatedformPermintaanBarang = await FormPermintaanBarang.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedformPermintaanBarang);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a formPermintaanBarang
router.delete('/:id', async (req, res) => {
    try {
        const formPermintaanBarang = await FormPermintaanBarang.findByIdAndDelete(req.params.id);
        if (!formPermintaanBarang) return res.status(404).json({ error: 'formPermintaanBarang not found' });
        res.json({ message: 'formPermintaanBarang deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
