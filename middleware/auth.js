const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Splitting to get token after 'Bearer'
    
    if (!token) return res.status(403).json({ error: 'No token provided' });


    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Failed to authenticate token' });
            req.user = decoded; // Attach the decoded user to req.user
            console.log("Decoded token:", decoded); // Log the decoded token
            next();
        });
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
