const express = require("express");
const router = express.Router();
const SparePartPO = require("../models/sparePartPO");

// Create a new SparePartPO
router.post("/", async (req, res) => {
  try {
    const sparePartPO = new SparePartPO(req.body);
    await sparePartPO.save();
    res.status(201).json(sparePartPO);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all SparePartPOs
router.get("/", async (req, res) => {
  try {
    const sparePartPOs = await SparePartPO.find();
    res.json(sparePartPOs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a SparePartPO
router.put("/:id", async (req, res) => {
  try {
    const sparePartPO = await SparePartPO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!sparePartPO) return res.status(404).json({ error: "Spare Part PO not found" });
    res.json(sparePartPO);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a SparePartPO
router.delete("/:id", async (req, res) => {
  try {
    const sparePartPO = await SparePartPO.findByIdAndDelete(req.params.id);
    if (!sparePartPO) return res.status(404).json({ error: "Spare Part PO not found" });
    res.json({ message: "Spare Part PO deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
