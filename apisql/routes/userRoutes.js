const express = require('express');
const router = express.Router();
const controller = require('../controller/userController/index.js')
const {verifyToken} = require('../middlewares/authorize')
const {checkAdminPower, checkUserPower} = require('../middlewares/checkPower')

router.get('/api', verifyToken, checkAdminPower, controller.home); //Test Route
router.get('/api/getUsers',verifyToken, checkAdminPower, controller.getAllUser); //Get All User
router.get('/api/totalDues',verifyToken, checkAdminPower, controller.totalDues); //get Total dues

router.post('/api/add',verifyToken, checkAdminPower, controller.addUser)//Add User
router.put('/api/consume/:item/:qty', verifyToken, checkUserPower, controller.consume) //consume food 
router.put('/api/update/:item/:qty',verifyToken, checkAdminPower, controller.addQuantity) //Update Food Quantity
router.put('/api/remove/:item/:qty',verifyToken, checkAdminPower, controller.removeQuantity) //Update Food Quantity


module.exports = router 