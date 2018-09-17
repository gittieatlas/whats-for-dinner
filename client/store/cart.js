// ACTION TYPES
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const INCREASE_ITEM_COUNT = 'INCREASE_ITEM_COUNT'
export const DECREASE_ITEM_COUNT = 'DECREASE_ITEM_COUNT'

// ACTION CREATORS
const addedToCart = mealId => ({
  type: ADD_TO_CART,
  mealId
})

const removedFromCart = mealId => ({
  type: REMOVE_FROM_CART,
  mealId
})

const increasedItemCount = mealId => ({
  type: INCREASE_ITEM_COUNT,
  mealId
})

const decreasedItemCount = mealId => ({
  type: DECREASE_ITEM_COUNT,
  mealId
})

// THUNKS
export const addToCart = mealId => dispatch => {
  // TODO: await and make http POST request for persistance
  dispatch(addedToCart(mealId))
}

export const removeFromCart = mealId => dispatch => {
  // TODO: await and make http POST request for persistance
  dispatch(removedFromCart(mealId))
}

export const decreaseItemCount = mealId => dispatch => {
  // TODO: await and make http POST request for persistance
  dispatch(decreasedItemCount(mealId))
}

export const increaseItemCount = mealId => dispatch => {
  // TODO: await and make http POST request for persistance
  dispatch(increasedItemCount(mealId))
}

export const selectCartTotal = (cart, meals) => {
  return Object.keys(cart)
    .map(mealId => {
      const count = cart[mealId]
      const price = meals.find(meal => meal.id === Number(mealId)).price
      const subtotal = count * price

      return subtotal
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

// REDUCER
export default function reducer(cart = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (action.mealId in cart) {
        return {
          ...cart,
          [action.mealId]: cart[action.mealId] + 1
        }
      } else {
        return {
          ...cart,
          [action.mealId]: 1
        }
      }

    case REMOVE_FROM_CART:
      const mealIds = Object.keys(cart).filter(
        mealId => Number(mealId) !== action.mealId
      )
      console.log(mealIds)

      const newCart = {}
      mealIds.forEach(mealId => {
        newCart[mealId] = cart[mealId]
      })
      return newCart

    case INCREASE_ITEM_COUNT:
      return {
        ...cart,
        [action.mealId]: cart[action.mealId] + 1
      }

    case DECREASE_ITEM_COUNT:
      return {
        ...cart,
        [action.mealId]: cart[action.mealId] - 1 // TODO: handle if ends up at 0
      }

    default:
      return cart
  }
}
