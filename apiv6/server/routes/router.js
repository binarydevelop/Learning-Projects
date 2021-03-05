const controller = require('../controllers/controller');
const express = require('express');
const router = express.Router();
const {verifyToken, checkPower} = require('../Middlewares/authMiddleware');
const { checkIfUserExist } = require('../utils/helperFunctions/functions')
const { addUserValidation , loginValidation } = require('../validation/user/userValidation');
const { addEntityValidation } = require('../validation/entity/entityValidation');

//API ROUTES
router.get('/api',verifyToken, checkPower, controller.home); //Testing Route
router.get('/api/entites', verifyToken, checkPower, controller.getEntity) // checked
router.get('/api/users', verifyToken, checkPower, controller.getUsers) // checked
router.get('/api/feedstatus/:id/:signature/:code', verifyToken, controller.getFeedStatus)// checked
router.get('/api/viewfeedbacks/:id', verifyToken, controller.viewAllFeed)
router.get('/api/filter/:m_category', verifyToken, controller.filterByCategory) //cehcked


router.post('/api/create/entity', verifyToken, addEntityValidation, controller.createEntity); 
router.post('/api/create/user', verifyToken, addUserValidation, checkIfUserExist, controller.createUser); 
router.post('/api/login', loginValidation, controller.login); 

router.put('/api/add/feedback/:id', verifyToken, controller.addFeedback); 
router.put('/api/approve/feedback/:id/:signature', verifyToken, checkPower, controller.approveFeed); 
router.put('/api/update/:id/:signature', verifyToken, controller.updateFeedback); 

router.delete('/api/delete/entity/:id', verifyToken, checkPower, controller.deleteEntity); 
router.delete('/api/delete/feedback/:id/:signature', verifyToken, checkPower, controller.deleteFeedback); // checked

module.exports = router;