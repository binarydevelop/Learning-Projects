const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')
const service = require('../service/service')

router.get('/users', controller.getUsers, service.getUsers)


module.exports = router;