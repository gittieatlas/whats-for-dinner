const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {address, phoneNumber, cart, userId} = req.body
    const orderData = {
      shippingAddress: address,
      phoneNumber,
      items: cart,
      userId
    }
    const order = await Order.create(orderData, {returning: true})
    if (userId) {
      // TODO: Send email
    }
    res.json(order.id)
  } catch (err) {
    next(err)
  }
})
