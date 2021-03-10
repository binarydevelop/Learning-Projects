const controller = require('../controllers/controller');
const express = require('express');
const router = express.Router();
const {verifyToken, checkPower} = require('../Middlewares/authMiddleware');
const {checkAdminPower, checkUserPower} = require('../Middlewares/checkPower');
const { checkIfUserExist } = require('../utils/helperFunctions/functions')
const { addUserValidation , loginValidation } = require('../validation/user/userValidation');
const { addEntityValidation } = require('../validation/entity/entityValidation');

//API ROUTES
router.get('/api',verifyToken, checkAdminPower,  controller.home); 
router.get('/api/entites', verifyToken, checkAdminPower, controller.getEntity) 
router.get('/api/users', verifyToken, checkAdminPower, controller.getUsers) 
router.get('/api/getfeed', verifyToken, checkAdminPower, controller.getFeed) 
router.get('/api/viewfeedbacks', verifyToken, checkUserPower, controller.viewAllFeed) //checked
router.get('/api/filter/:mCategory', verifyToken, controller.filterByCategory) 


router.post('/api/create/entity', verifyToken, addEntityValidation, checkAdminPower, controller.createEntity); 
router.post('/api/create/user', verifyToken, addUserValidation, checkAdminPower, checkIfUserExist, controller.createUser); 
router.post('/api/login', loginValidation, controller.login); 

router.put('/api/add/feedback', verifyToken, checkUserPower, controller.addFeedback); 
router.put('/api/approve/feedback', verifyToken, checkAdminPower, controller.approveFeed); 
router.put('/api/update', verifyToken, checkUserPower, controller.updateFeedback); 

router.delete('/api/delete/entity', verifyToken, checkAdminPower, controller.deleteEntity); 
router.delete('/api/delete/feedback', verifyToken, checkAdminPower, controller.deleteFeedback); 

module.exports = router;