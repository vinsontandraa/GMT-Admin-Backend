// routes/formPermintaanBarangs.js
const express = require('express');
const router = express.Router();
const FormPermintaanBarang = require('../models/FormPermintaanBarang');
const FormPO = require('../models/formPOModel');
const Sparepart = require('../models/Sparepart'); // Include the Sparepart model
const Sequence = require('../models/sequence'); // New model for auto-incrementing

const getNextSequence = async () => {
    const sequence = await Sequence.findOneAndUpdate(
        { name: "FormPermintaanBarang" },
        { $inc: { value: 1 } },
        { new: true, upsert: true } // Create if not exists
    );
    return sequence.value;
};

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

    const {
        noForm,
        noPlat,
        tanggal,
        kode,
        namaMitra,
        noID,
        tujuanPermintaan,
        masalah,
        solusi,
        diDiagnosaOleh,
        yaTidak,
        produk,
        tipe,
        satuan,
        qty,
        createdBy
    } = req.body;

    try {
        const no = await getNextSequence();
        const newformPermintaanBarang = new FormPermintaanBarang({
            tanggal,
            noForm,
            no, // Auto-incremented No
            noPlat,
            kode,
            namaMitra,
            noID,
            tujuanPermintaan,
            masalah,
            solusi,
            diDiagnosaOleh,
            yaTidak,
            produk,
            tipe,
            satuan,
            qty,
            createdBy, // Assuming you have middleware that attaches the user info
            approvalStatus: 'pending', // Initial approval status
            firstApprovedBy: null,
            secondApprovedBy: null
        });
        // const newformPermintaanBarang = new FormPermintaanBarang(req.body);
        await newformPermintaanBarang.save();
        res.status(201).json(newformPermintaanBarang);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// // Create a new formPermintaanBarang (Admin)
// router.post('/', async (req, res) => {
//     const { platId, ...formData } = req.body;

//     try {
//          // Check if a Form exists with the given Plat ID
//          let form = await Form.findOne({ platId });

//          if (!form) {
//              // If the Form doesn't exist, create a new one
//              form = new Form({
//                  formId: generateFormId(),
//                  platId,
//              });
//              await form.save();
//          }
 
//          // Add "NoForm" to FormPermintaanBarang data
//          formData.noForm = form.formId;

//         const newformPermintaanBarang = new FormPermintaanBarang(formData);
//         await newformPermintaanBarang.save();
//         res.status(201).json(newformPermintaanBarang);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// Update a formPermintaanBarang (Supervisor Approval)
router.put('/:id', async (req, res) => {
    try {
        const { username, approvalType } = req.body; // Get username and approval type
        const formPermintaanBarang = await FormPermintaanBarang.findById(req.params.id);
        if (!formPermintaanBarang) return res.status(404).json({ error: 'formPermintaanBarang not found' });
        if (approvalType === 'first') {
            if (!formPermintaanBarang.firstApprovedBy) {
                formPermintaanBarang.firstApprovedBy = username; // First approver
                formPermintaanBarang.approvalStatus = 'awaiting second approval'; // Change status
            } else {
                return res.status(400).json({ error: 'Already first approved' });
            }
        } else if (approvalType === 'second') {
            if (formPermintaanBarang.firstApprovedBy && !formPermintaanBarang.secondApprovedBy) {
                formPermintaanBarang.secondApprovedBy = username; // Second approver
                formPermintaanBarang.approvalStatus = 'approved'; // Change status to approved

                // Create the FormPO upon full approval
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
                    merek: 'a',
                    qtyKetersediaan: 0,
                    keterangan: 'a'
                });
                
                await poForm.save();
            } else {
                return res.status(400).json({ error: 'First approval is required before second approval' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid approval type' });
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

// Route to get sparepart data based on 'produk' (auto-fill functionality)
router.get('/sparepart-data/:produk', async (req, res) => {
    try {
        const { produk } = req.params;
        const sparepart = await Sparepart.findOne({ namaProduk: produk });
        if (!sparepart) {
            return res.status(404).json({ error: "Spare part not found" });
        }
        res.json({ tipe: sparepart.tipe, satuan: sparepart.satuan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
