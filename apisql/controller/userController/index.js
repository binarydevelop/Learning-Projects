const db = require('../../config/database');
const User = require('../../models/Users');

exports.home = async(req, res) => {
    res.send('Test Working.')
}

exports.getAllUser = async(req, res) => {
   await User.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log({Error: err.message})
            res.send('Oops Didnt work.')
        })
}

exports.addUser = async(req, res) => {
const newUser = await User.create({ username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password,
                                    power: req.body.power,
                                    amount_due: req.body.amt_due})
                                        .then((data) => {
                                            console.log(data)
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                    console.log(newUser);
                                    res.send('User Added.')
}

