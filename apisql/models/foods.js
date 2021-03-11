const Sequelize = require('sequelize')
const db = require('../config/database')

const Food = db.define('food',{
    food_item: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    }
})

module.exports = User;