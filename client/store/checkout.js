import axios from 'axios'

import {openSnackbar} from '../components/Utils/Notifier'

// ACTION TYPES
export const SAVE_DELIVERY_INFO = 'SAVE_DELIVERY_INFO'
export const PLACED_ORDER = 'PLACED_ORDER'

// ACTION CREATORS
export const saveDeliveryInfo = deliveryData => ({
  type: SAVE_DELIVERY_INFO,
  deliveryData
})

export const placedOrder = confirmationNumber => ({
  type: PLACED_ORDER,
  confirmationNumber
})

// THUNK CREATORS
export const postOrder = () => async (dispatch, getState) => {
  const {cart, checkout, user} = getState()
  const orderData = {
    address: checkout.shippingAddress,
    phoneNumber: checkout.phoneNumber,
    cart,
    userId: user.id
  }
  try {
    const res = await axios.post('/api/orders', orderData)
    dispatch(placedOrder(res.data))
  } catch (err) {
    openSnackbar({message: 'Placing order unsuccessful'})
  }
}

// REDUCER
export default function reducer(orderInfo = {}, action) {
  switch (action.type) {
    case SAVE_DELIVERY_INFO:
      return {
        shippingAddress: {
          address1: action.deliveryData.address1,
          address2: action.deliveryData.address2,
          city: action.deliveryData.city,
          state: action.deliveryData.state,
          zip: action.deliveryData.zip
        },
        phoneNumber: action.deliveryData.phone
      }

    case PLACED_ORDER:
      return {
        orderNumber: action.confirmationNumber
      }
    default:
      return orderInfo
  }
}
