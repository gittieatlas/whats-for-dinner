import axios from 'axios'

// ACTION TYPES
const INITIALIZE = 'INITIALIZE_MEALS'

// ACTION CREATORS
const init = meals => ({type: INITIALIZE, meals})

// THUNK CREATORS
export const fetchMeals = () => async dispatch => {
  try {
    const res = await axios.get('/api/meals')
    dispatch(init(res.data))
  } catch (err) {
    // OB: consider reporting error to user, maybe use a "toast notification", or a "snackbar" https://material-ui.com/demos/snackbars/, it's not the best error handling, but it's WAY better than nothing
    console.error('Fetching meals unsuccessful', err)
  }
}

// REDUCER
export default function reducer(meals = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.meals

    default:
      return meals
  }
}
