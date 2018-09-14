const Sequelize = require('sequelize')
const db = require('../db')

// OB: what about no size model? one alternative: nested JSON document in meal
const Size = db.define('size', {
  // OB: watch out for floating point math! recommendation for currency data is to use INTEGER and measure in cents, convert into the right format on the front of the frontend
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  size: {
    type: Sequelize.ENUM('2', '4', '6'),
    allowNull: false
  }
})

module.exports = Size

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
