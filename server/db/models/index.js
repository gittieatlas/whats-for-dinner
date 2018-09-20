const User = require('./user')
const Meal = require('./meal')
const Order = require('./order')

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  Meal,
  Order
}
