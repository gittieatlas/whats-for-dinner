const Sequelize = require('sequelize')
const db = require('../db')

const Size = db.define('size', {
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  size: {
    type: Sequelize.ENUM(2, 4, 6),
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
