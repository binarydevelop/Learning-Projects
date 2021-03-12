const express = require('express');
const router = express.Router();
const controller = require('../controller/foodController/index.js')

router.get('/api', controller.home);
router.get('/api/getFood',controller.getAllFood); //Get All User

router.post('/api/add', controller.addFood)



module.exports = router 