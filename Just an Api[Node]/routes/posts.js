const express = require('express');
const { db } = require('../models/POSTS');
const router = express.Router();
const controller = require('../controller/controller')
//Import MODEL
const Post = require('../models/POSTS');
 
router.get('/', controller.getAll);
router.post('/create', controller.createPost);
router.put('/update/:title', controller.updatePost);
router.delete('\delete\:title', controller.deletePost);

module.exports = router;