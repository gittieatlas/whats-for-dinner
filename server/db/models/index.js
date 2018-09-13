const User = require('./user')
const Meal = require('./meal')
const Size = require('./size')

Size.belongsTo(Meal)
Meal.hasMany(Size)

module.exports = {
  User,
  Meal,
  Size
}
