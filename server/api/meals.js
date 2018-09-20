const router = require('express').Router()
const {Meal} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const meals = await Meal.findAll({
      order: [['id', 'DESC']]
    })
    res.json(meals)
  } catch (err) {
    next(err)
  }
})
