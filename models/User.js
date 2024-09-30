const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin1', 'admin2', 'admin3','admin5','admin6'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
