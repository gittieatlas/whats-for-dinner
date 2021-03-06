import axios from 'axios'
import {clearCart} from './cart'

import {openSnackbar} from '../components/Utils/Notifier'

// ACTION TYPES
export const SAVE_DELIVERY_INFO = 'SAVE_DELIVERY_INFO'
export const PLACED_ORDER = 'PLACED_ORDER'
export const CLEAR_DELIVERY_INFO = 'CLEAR_DELIVERY_INFO'

// ACTION CREATORS
export const saveDeliveryInfo = deliveryData => ({
  type: SAVE_DELIVERY_INFO,
  deliveryData
})

export const clearDeliveryInfo = () => ({type: CLEAR_DELIVERY_INFO})

// THUNK CREATORS
export const postOrder = () => async (dispatch, getState) => {
  const {cart, checkout} = getState()
  const orderData = {
    address: checkout.shippingAddress,
    phoneNumber: checkout.phoneNumber,
    cart
  }
  try {
    const {data: order} = await axios.post('/api/orders', orderData)
    dispatch(clearCart())
    dispatch(clearDeliveryInfo())
    return order.id
  } catch (err) {
    openSnackbar({message: 'Placing order unsuccessful'})
  }
}

const initialState = {}

// REDUCER
export default function reducer(orderInfo = initialState, action) {
  switch (action.type) {
    case SAVE_DELIVERY_INFO:
      return {
        shippingAddress: action.deliveryData.shippingAddress,
        phoneNumber: action.deliveryData.phoneNumber
      }

    case CLEAR_DELIVERY_INFO:
      return initialState

    default:
      return orderInfo
  }
}
