const Sequelize = require('sequelize')
const db = require('../config/database')
const { DataTypes } = require("sequelize");

const foodSchema = db.define('food',{
    food_item: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            notEmpty: {
                args: true,
                msg: 'Food item cannot be Empty.'
            },
            len:{
                args: [6,128],
                msg: 'Food name should be in between 6-128.'
            },
        }
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Quantity should be Numeric.'
            },
            isInt: true,
            notEmpty: {
                args: true,
                msg: 'Quantity cannot be empty.'
            },
        }
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate:{
            isNumeric: {
                args: true,
                msg: 'Price should be Numeric.'
            },
            isInt: {
                args: true,
                msg: 'Price be Numeric.'
            },
            notEmpty: {
                args: true,
                msg: 'Price cannot be empty.'
            },
        }
    }
})

module.exports = foodSchema;