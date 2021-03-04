const controller = require('../controllers/controller');
const express= require('express');
const router = express.Router();
const {verifyToken, checkPower} = require('../Middlewares/authMiddleware');
const { checkIfUserExist } = require('../utils/Helper_functions/functions')
const { addUserValidation , loginValidation } = require('../validation/user/user_validation');
const { addEntityValidation } = require('../validation/entity/entity_validation');

//API ROUTES
router.get('/api',verifyToken, checkPower, controller.home); //Testing Route
router.get('/api/entity/:code', verifyToken, checkPower, controller.getEntity) // View all Entities(00)
router.get('/api/users/:code',verifyToken, checkPower, controller.getUsers) //View all Users
router.get('/api/feedstatus/:id/:signature/:code', verifyToken, controller.getFeedStatus)// View Feedback status
router.get('/api/viewfeedbacks/:id/:code', verifyToken, controller.viewAllFeed)//view all feedbacks
router.get('/api/filter/:m_category',verifyToken, controller.filterByCategory) //filter by category


router.post('/api/create/entity/:code', verifyToken, addEntityValidation, controller.createEntity); //create a new Entity(00) [ {"title":"Blockchain","category":"Technology"} ] Validate Entity and then create
router.post('/api/create/user/:code', verifyToken, addUserValidation, checkIfUserExist, controller.createUser); //create a new User(00) [{"name":"Tushar","power":"admin"}]
router.post('/api/login', loginValidation, controller.login)  

router.put('/api/add/feedback/:id/:code', verifyToken, controller.addFeedback); // add Feedback to an Entity(11) [Only USER] [  { "name":"Flash", "content":"This is addeda as feedback","by": "Flash","sign": "asdf"} ]
router.put('/api/approve/feedback/:id/:signature/:code', verifyToken, checkPower, controller.approveFeed);//Approve a Feedback
router.put('/api/update/:id/:signature/:code', verifyToken, controller.updateFeedback); // Update feedback [ {"updateit":"This should update"} ]

router.delete('/api/delete/entity/:id/:code', verifyToken, checkPower, controller.deleteEntity); // delete Entity by id [only Admin]
router.delete('/api/delete/feedback/:id/:signature/:code', verifyToken, checkPower, controller.deleteFeedback);

module.exports = router;