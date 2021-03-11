const db = require('../../config/database');
const Food = require('../../models/Users')


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

exports.addFood = async(req, res) => {

}