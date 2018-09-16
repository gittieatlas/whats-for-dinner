import axios from 'axios'

import {openSnackbar} from '../components/Utils/Notifier'

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
    openSnackbar({message: 'Fetching meals unsuccessful'})
  }
}

export function getMeal(meals, mealId) {
  return meals.find(meal => meal.id === mealId)
}

export const selectMeal = (meals, id) => {
  return meals.find(meal => meal.id === id)
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
