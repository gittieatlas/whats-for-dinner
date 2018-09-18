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
  /* OB: some libraries out there for random input validations
  Not only useful for not needing to reinvent the wheel, but also useful for universal code reuse. Having a data model validations that are not coupled to your tables. Then you can use these validations in sequelize AND in your forms in the frontend.
  */
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
