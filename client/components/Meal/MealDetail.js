import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import history from '../../history'

import {withRouter} from 'react-router-dom'
import {Typography, Grid, CardMedia, Button} from '@material-ui/core'
import {gridSpacing} from '../Utils/Numbers'
import {fetchMeals, selectMeal} from '../../store/meals'
import {addToCart} from '../../store/cart'
import {toCurrency} from '../../utils/stringUtils'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

const getId = props => Number(props.match.params.mealId)

class MealDetails extends Component {
  async componentDidMount() {
    // ensures that the app will work even if the "entry point" is this component
    await this.props.loadMeals()
  }

  handleAddToCart = async () => {
    const meal = this.props.meal
    await this.props.addItem(meal.id)
    history.push('/cart')
  }

  render() {
    const {classes, meal} = this.props

    const {handleAddToCart} = this
    return !meal ? (
      <Typography
        variant="title"
        color="secondary"
        align="center"
        className={classes.header}
      >
        No such meal found
      </Typography>
    ) : (
      <Grid container spacing={gridSpacing} className={classes.mTop8}>
        <Grid item xs={12} sm={12} md={6}>
          <CardMedia
            component="img"
            className={classes.media}
            image={meal.imageUrl}
            title={meal.name}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="headline" color="textPrimary">
            {meal.name}
          </Typography>
          <Typography variant="title" color="secondary">
            {meal.shortDescription}
          </Typography>

          <Typography
            variant="subheading"
            color="secondary"
            className={classes.mTop2}
          >
            {toCurrency(meal.price)} | {`Serves ${meal.servings}`}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            className={classes.mTop4}
            onClick={handleAddToCart}
          >
            {`Add to cart \u2022 ${toCurrency(meal.price)}`}
          </Button>

          <Typography
            variant="subheading"
            color="secondary"
            className={classes.mTop4}
          >
            {meal.longDescription}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    meal: selectMeal(state.meals, getId(ownProps))
  }
}

const mapDispatch = dispatch => ({
  loadMeals: () => dispatch(fetchMeals()),
  addItem: mealId => dispatch(addToCart(mealId))
})

export default withStyles(globalStyles)(
  withRouter(connect(mapState, mapDispatch)(MealDetails))
)

MealDetails.propTypes = {
  classes: PropTypes.object.isRequired
}
