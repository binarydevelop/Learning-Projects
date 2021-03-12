const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize')
const db = require('../config/database');
const powerType= require('../utils/powerTypes')

const userSchema = db.define('users',{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Username cannot be Empty.'
            },
            len: { 
                args: [6,128],
                msg: 'Username Length shoulde be greater than 6.' 
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'Not valid Email Format.'
            },
            notEmpty: {
                args: true,
                msg: 'Email Cannot be Empty'
            },
            len: 
            {  args: [6,100],
                msg: 'Length should be in between 6-100.' 
        }
    }
},
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Password cannot be empty.'
            },
            len: {
                args: [6, 256],
                msg: 'Passoword Length should be between 6 - 256.'
            },
        }
    },
    power: {
        type: powerType,
        allowNull: false,
        default: powerType.user,
        validate: {
            isIn: {
                args: [['Admin', 'User']],
                msg: 'Power can be Admin or User.'
            }
            } 
        },
    amount_due: {
        type: DataTypes.INTEGER,
        validate: {
            isNumeric: {
                args: true,
                msg: 'Amount should be Numeric.'
            },
            isInt: true,
        }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
})


module.exports = userSchema;