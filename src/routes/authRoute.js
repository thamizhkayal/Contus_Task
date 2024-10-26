const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    // Mock Data
    const user  = {id:1,username:'thamizh'}
    const token = jwt.sign(user.id, process.env.API_SECRET_KEY);
    res.status(200).json({token});
  });

module.exports = router;
