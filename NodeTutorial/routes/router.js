const express = require('express');
const router =  express.Router();

router.get('/one', (req,res) => {
    res.send('Hi');
})

module.exports = router;