const express = require('express');
const router = express.Router();

//Import MODEL
const Post = require('../models/POSTS');

 
router.get('/',(req,res)=>{
    const all_posts= Post.find();
    res.json(all_posts);
})
router.post('/specific',(req,res)=>{
   const new_post = new Post({
       title : req.body.title,
       description : req.body.description
   })
   new_post.save() 
   .then(data => {
       res.json(data);
   })
   .catch(err =>{
       res.send(err);
   })
});


module.exports = router;