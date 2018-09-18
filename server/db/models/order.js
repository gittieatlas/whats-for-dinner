const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  items: {
    type: Sequelize.JSON,
    allowNull: false
  },
  shippingAddress: {
    type: Sequelize.JSON,
    allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: {
        args: [10, 20],
        msg: 'Min length of the phone number is 10'
      }
    }
  }
})

module.exports = Order
