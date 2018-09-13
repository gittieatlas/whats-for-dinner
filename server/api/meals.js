const router = require('express').Router()
const {Meal, Size} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const meals = await Meal.findAll({
      include: [{model: Size}]
    })
    res.json(meals)
  } catch (err) {
    next(err)
  }
})
