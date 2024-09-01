const mongoose = require('mongoose');

const plateSchema = new mongoose.Schema({
    noPlat: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Plate', plateSchema);
