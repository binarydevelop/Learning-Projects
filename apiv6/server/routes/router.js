const controller = require('../controllers/controller');
const express= require('express');
const router = express.Router();
const { checkIfUserExist } = require('../utils/Helper_functions/functions')
const { addUserValidation } = require('../validation/user/user_validation');
const { addEntityValidation } = require('../validation/entity/entity_validation');

//API ROUTES
router.get('/api', controller.home); //Testing Route
router.get('/api/entity/:code', controller.getEntity) // View all Entities(00)
router.get('/api/users/:code',controller.getUsers) //View all Users
router.get('/api/feedstatus/:id/:signature/:code',controller.getFeedStatus)// View Feedback status
router.get('/api/viewfeedbacks/:id/:code',controller.viewAllFeed)//view all feedbacks
router.get('/api/filter/:m_category',controller.filterByCategory) //filter by category


router.post('/api/create/entity/:code', addEntityValidation, controller.createEntity); //create a new Entity(00) [ {"title":"Blockchain","category":"Technology"} ] Validate Entity and then create
router.post('/api/create/user/:code', addUserValidation, checkIfUserExist, controller.createUser); //create a new User(00) [{"name":"Tushar","power":"admin"}]
router.post('/api/login',controller.login)  
router.put('/api/add/feedback/:id/:code', controller.addFeedback); // add Feedback to an Entity(11) [Only USER] [  { "name":"Flash", "content":"This is addeda as feedback","by": "Flash","sign": "asdf"} ]
router.put('/api/approve/feedback/:id/:signature/:code',controller.approveFeed);//Approve a Feedback
router.put('/api/update/:id/:signature/:code',controller.updateFeedback); // Update feedback [ {"updateit":"This should update"} ]

router.delete('/api/delete/entity/:id/:code', controller.deleteEntity); // delete Entity by id [only Admin]
router.delete('/api/delete/feedback/:id/:signature/:code',controller.deleteFeedback);

module.exports = router;