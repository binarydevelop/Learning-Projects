exports.getAll= (req,res) => {
    try{
        const all_posts= Post.find();
        res.json(all_posts);
    }
    catch(err){
        console.log(err.message);
        res.send('Failed getting Posts');
    }  
}

exports.createPost = (req, res)=>{
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
 }

 exports.updatePost=  async (req, res) => {
    const result = await db.find({title: title});
    
    if(result){
        const updatedTitle = req.body.title;
        if(req.title){
            result.title = updatedTitle;
        }
        const updatedDescription = req.body.description;
        if(req.description){
            result.description = updatedDescription;
        }
        result.save();
        return result;
    }
}

exports.deletePost =  async(req, res) => {
    const result = await db.find({title: title});
    if(result){
        db.delete(result);
        db.save();
        return ({message: 'Data Deleted Successfully.'})
    }
}