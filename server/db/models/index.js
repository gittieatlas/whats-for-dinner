const User = require('./user')
const Meal = require('./meal')
const Size = require('./size')

Size.belongsTo(Meal)

module.exports = {
  User,
  Meal,
  Size
}
