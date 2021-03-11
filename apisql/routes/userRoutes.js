const express = require('express');
const router = express.Router();
const controller = require('../controller/userController/index.js')


router.get('/api', controller.home); //Test Route
router.get('/api/getUsers', controller.getAllUser); //Get All User

router.post('/api/add', controller.addUser)




module.exports = router