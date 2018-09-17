// ACTION TYPES
export const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATORS
const addedToCart = mealId => ({
  type: ADD_TO_CART,
  mealId
})

// THUNKS
export const addToCart = mealId => dispatch => {
  // TODO: await and make http POST request
  dispatch(addedToCart(mealId))
}

// REDUCER
export default function reducer(cart = {}, action) {
  switch (action.type) {
    case ADD_TO_CART:
      if (action.mealId in cart) {
        console.log('meal id in cart')
        console.log({
          ...cart,
          [action.mealId]: cart[action.mealId] + 1
        })

        return {
          ...cart,
          [action.mealId]: cart[action.mealId] + 1
        }
      } else {
        console.log('meal id not in cart')

        console.log({
          ...cart,
          [action.mealId]: 1
        })
        return {
          ...cart,
          [action.mealId]: 1
        }
      }

    default:
      return cart
  }
}
