const Sequelize = require('sequelize')
const db = require('../config/database')


const userSchema = db.define('users',{
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    power: {
        type: Sequelize.STRING
    },
    amount_due: {
        type: Sequelize.STRING
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})


module.exports = userSchema;