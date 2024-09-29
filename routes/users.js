const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET current user
router.get('/current', authMiddleware, async (req, res) => {
    try {
       console.log("Current user request:", req.user);
    
       const user = await User.findById(req.user.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
