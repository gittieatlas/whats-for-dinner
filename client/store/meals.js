import axios from 'axios'

// ACTION TYPES
const INITIALIZE = 'INITIALIZE_MEALS'

// ACTION CREATORS
const init = meals => ({type: INITIALIZE, meals})

// THUNK CREATORS
export const fetchMeals = () => dispatch => {
  axios
    .get('/api/meals')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching meals unsuccessful', err))
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
