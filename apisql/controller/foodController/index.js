const db = require('../../config/database');
const Food = require('../../models/foods')


exports.home = async(req, res) => {
    res.send('Food Route Test Working.')
}

exports.getAllFood = async(req,res) => {
    await Food.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send({Error: err.message})
        })
}
                                        //UNMANAGED TRANSACTION
exports.addFood = async(req, res) => {
    const t = await db.transaction();
    try{
        await Food.create({ 
            food_item: req.body.food,
            quantity: req.body.quantity,
            price: req.body.price},
            {transaction: t})

            await t.commit();
            res.send('Added Food item.')
    }
    catch(err) {
        console.log(err.message);
        res.send({Error: 'Could not add Food item.'})
        await t.rollback();
    }
}

