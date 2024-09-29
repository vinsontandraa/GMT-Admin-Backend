const express = require('express');
const router = express.Router();
const Form = require('../models/formModel');
const FormPermintaanBarang = require('../models/FormPermintaanBarang');

// Function to generate a unique Form Id
const generateFormId = () => {
    return `FORM-${Date.now()}`;
};

// Get all Forms
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.json(forms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a specific Form by ID
router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ error: 'Form not found' });
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new Form
router.post('/', async (req, res) => {
    const { platId } = req.body;

    try {
        const existingForm = await Form.findOne({ platId });
        if (existingForm) {
            return res.status(400).json({ error: 'Form with this Plat ID already exists' });
        }

        const newForm = new Form({
            formId: generateFormId(),
            platId,
        });

        await newForm.save();
        res.status(201).json(newForm);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a Form
router.put('/:id', async (req, res) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedForm);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a Form
router.delete('/:id', async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) return res.status(404).json({ error: 'Form not found' });
        res.json({ message: 'Form deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Logic for handling "NoForm" in FormPermintaanBarang
router.post('/form-permintaan-barang', async (req, res) => {
    const { platId, ...formData } = req.body;

    try {
        // Check if a Form exists with the given Plat ID
        let form = await Form.findOne({ platId });

        if (!form) {
            // If the Form doesn't exist, create a new one
            form = new Form({
                formId: generateFormId(),
                platId,
            });
            await form.save();
        }

        // Add "NoForm" to FormPermintaanBarang data
        formData.noForm = form.formId;

        const newFormPermintaanBarang = new FormPermintaanBarang(formData);
        await newFormPermintaanBarang.save();

        res.status(201).json(newFormPermintaanBarang);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getFormIdByPlatId/:platId', async (req, res) => {
    const { platId } = req.params;

    try {
        // Check if a Form exists with the given Plat ID
        let form = await Form.findOne({ platId });

        if (!form) {
            // If the Form doesn't exist, create a new one
            form = new Form({
                formId: generateFormId(),
                platId,
            });
            await form.save();
        }

        // Return the existing or new Form ID
        res.json({ formId: form.formId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
