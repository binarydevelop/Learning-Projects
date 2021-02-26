const controller = require('../controllers/controller');
const express= require('express');
const router = express.Router();
const { addUserValidation } = require('../validation/user/user_validation')

//API ROUTES
router.get('/api', controller.home); //Testing Route
router.get('/api/entity/:code', controller.getEntity) // View all Entities(00)
router.get('/api/users/:code',controller.getUsers) //View all Users
router.get('/api/feedstatus/:m_id/:signature/:code',controller.getFeedStatus)// View Feedback status
router.get('/api/viewfeedbacks/:m_id/:code',controller.viewAllFeed)//view all feedbacks
router.get('/api/filter/:m_category',controller.filterByCategory) //filter by category


router.post('/api/create/entity/:code', controller.createEntity); //create a new Entity(00) [ {"title":"Blockchain","category":"Technology"} ]
router.post('/api/create/user/:code', addUserValidation, controller.createUser); //create a new User(00) [{"name":"Tushar","power":"admin"}]
router.post('/api/add/feedback/:id/:code', controller.addFeedback); // add Feedback to an Entity(11) [Only USER] [  { "name":"Flash", "content":"This is addeda as feedback","by": "Flash","sign": "asdf"} ]

router.put('/api/update/feedback/:m_id/:signature/:code',controller.approveFeed);//Approve a Feedback
router.put('/api/update/:m_id/:signature/:code',controller.updateFeedback); // Update feedback [ {"updateit":"This should update"} ]

router.delete('/api/delete/entity/:id/:code', controller.deleteEntity); // delete Entity by id [only Admin]
router.delete('/api/delete/feedback/:m_id/:signature/:code',controller.deleteFeedback);

module.exports = router;