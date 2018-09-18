const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    // OB: web security issue with using the `userId` from the request body; use `req.user` instead
    // OB: also maybe the cart, especially if there was a price in the cart; make sure to calculate the price on the server side
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
    // OB: why not the whole order? might be a good idea for the sake of consistent API (across any / all POST request handlers) and future proofing
    res.json(order.id)
  } catch (err) {
    next(err)
  }
})
