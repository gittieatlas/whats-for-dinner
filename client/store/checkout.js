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
export const postOrder = orderData => async dispatch => {
  // TODO: pass data in as arg
  const orderDataMock = {
    address: {
      address1: '1002 West Kennedy BLVD',
      address2: '',
      city: 'Lakewood',
      state: 'NJ',
      zip: '08701'
    },
    phoneNumber: '7329019491',
    cart: {
      1: 4,
      2: 7
    },
    userId: 3
  }
  try {
    const res = await axios.post('/api/orders', orderDataMock)
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
        shippingAddress: action.deliveryData.address,
        phoneNumber: action.deliveryData.phoneNumber
      }

    case PLACED_ORDER:
      return {
        orderNumber: action.confirmationNumber
      }
    default:
      return orderInfo
  }
}
