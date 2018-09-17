const Sequelize = require('sequelize')
const db = require('../db')

const Meal = db.define('meal', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shortDescription: {
    type: Sequelize.STRING
  },
  longDescription: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  servings: {
    type: Sequelize.ENUM('2', '4', '6'),
    allowNull: false
  }
})

module.exports = Meal

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
