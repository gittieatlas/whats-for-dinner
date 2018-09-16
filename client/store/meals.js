import axios from 'axios'

// ACTION TYPES
export const SET_MEALS = 'SET_MEALS'

// ACTION CREATORS
export const setMeals = meals => ({type: SET_MEALS, meals})

// THUNK CREATORS
export const fetchMeals = () => async dispatch => {
  try {
    const res = await axios.get('/api/meals')
    dispatch(setMeals(res.data))
  } catch (err) {
    console.error('Fetching meals unsuccessful', err)
  }
}

// REDUCER
export default function reducer(meals = [], action) {
  switch (action.type) {
    case SET_MEALS:
      return action.meals

    default:
      return meals
  }
}
