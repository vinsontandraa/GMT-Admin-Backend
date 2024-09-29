const mongoose = require('mongoose');

const NoPOSchema = new mongoose.Schema({
    noPO: { type: String, required: true, unique: true },  // Change to String
    platId: { type: String, required: true },
    supplier: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
});

const NoPO = mongoose.model('PO', NoPOSchema);
module.exports = NoPO;
