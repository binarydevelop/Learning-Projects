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
router.get('/api/feedstatus/:id/:signature/:code', verifyToken, controller.getFeedStatus)// View Feedback status
router.get('/api/viewfeedbacks/:id/:code', verifyToken, controller.viewAllFeed)//view all feedbacks
router.get('/api/filter/:m_category', verifyToken, controller.filterByCategory) //filter by category


router.post('/api/create/entity', verifyToken, addEntityValidation, controller.createEntity); //Checked
router.post('/api/create/user', verifyToken, addUserValidation, checkIfUserExist, controller.createUser); //checked
router.post('/api/login', loginValidation, controller.login); //checked

router.put('/api/add/feedback/:id', verifyToken, controller.addFeedback); // checked
router.put('/api/approve/feedback/:id/:signature/:code', verifyToken, checkPower, controller.approveFeed);//Approve a Feedback
router.put('/api/update/:id/:signature/:code', verifyToken, controller.updateFeedback); // Update feedback [ {"updateit":"This should update"} ]

router.delete('/api/delete/entity/:id', verifyToken, checkPower, controller.deleteEntity); // checked
router.delete('/api/delete/feedback/:id/:signature/:code', verifyToken, checkPower, controller.deleteFeedback);

module.exports = router;