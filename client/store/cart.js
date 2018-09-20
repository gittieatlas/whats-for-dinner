// ACTION TYPES
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const INCREASE_ITEM_COUNT = 'INCREASE_ITEM_COUNT'
export const DECREASE_ITEM_COUNT = 'DECREASE_ITEM_COUNT'
export const CLEAR_CART = 'CLEAR_CART'

// ACTION CREATORS
const addedToCart = mealId => ({
  type: ADD_TO_CART,
  mealId
})

const removedFromCart = mealId => ({
  type: REMOVE_FROM_CART,
  mealId
})

const decreasedItemCount = mealId => ({
  type: DECREASE_ITEM_COUNT,
  mealId
})

export const clearCart = () => ({type: CLEAR_CART})

// THUNKS
export const addToCart = mealId => dispatch => {
  dispatch(addedToCart(mealId))
}

export const removeFromCart = mealId => dispatch => {
  dispatch(removedFromCart(mealId))
}

export const decreaseItemCount = mealId => dispatch => {
  dispatch(decreasedItemCount(mealId))
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

const initialState = {}

// REDUCER
export default function reducer(cart = initialState, action) {
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
      const {[action.mealId]: mealToRemove, ...restOfMeals} = cart
      return restOfMeals

    case DECREASE_ITEM_COUNT:
      if (cart[action.mealId] === 1) {
        const {[action.mealId]: remove, ...rest} = cart
        return rest
      }
      return {
        ...cart,
        [action.mealId]: cart[action.mealId] - 1
      }

    case CLEAR_CART:
      return initialState

    default:
      return cart
  }
}
