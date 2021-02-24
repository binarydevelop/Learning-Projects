const controller = require('../controllers/controller');
const express= require('express');
const router = express.Router();


//API ROUTES
router.get('/api', controller.home); //Testing Route
router.get('/api/:code', controller.getEntity) // View all Entities(00)
router.post('/api/create/entity/:code', controller.createEntity); //create a new Entity(00)
router.post('/api/create/user/:code', controller.createUser); //create a new User
router.delete('/api/delete/entity/:id/:code', controller.deleteEntity); // delete Entity by id [only Admin]
router.post('/api/add/feedback/:id/:code', controller.addFeedback); // add Feedback to an Entity(11) [Only USER]


module.exports = router;