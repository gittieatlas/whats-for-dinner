import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {withRouter} from 'react-router-dom'
import {Typography, Grid, CardMedia, Button} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {gridSpacing} from '../Utils/Numbers'
import {fetchMeals, selectMeal} from '../../store/meals'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

const getId = props => Number(props.match.params.mealId)

class MealDetails extends Component {
  async componentDidMount() {
    // ensures that the app will work even if the "entry point" is this component
    await this.props.loadMeals()
    this.props.meal.sizes[0] &&
      this.setState({
        size: this.props.meal.sizes[0]
      })
  }
  state = {
    size: this.props.meal.sizes[0] || {}
  }

  handleChange = event => {
    const sizeId = event.target.value
    this.setState({
      size: this.props.meal.sizes.find(serving => serving.id === sizeId)
    })
  }

  handleAddToCart = () => {}

  render() {
    const {classes, meal} = this.props
    const {size} = this.state
    const {handleChange, handleAddToCart} = this
    return !meal && !size ? (
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
            {`$${size.price}`}
          </Typography>

          <FormControl className={classes.mTop4} fullWidth>
            <Select
              value={size.id}
              onChange={handleChange}
              inputProps={{
                name: 'size',
                id: 'size'
              }}
            >
              {meal.sizes.map(serving => (
                <MenuItem key={serving.size} value={serving.id}>{`Serves ${
                  serving.size
                }`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            className={classes.mTop2}
            onClick={handleAddToCart}
          >
            {`Add to cart \u2022 $ ${size.price}`}
          </Button>

          <Typography
            variant="subheading"
            color="secondary"
            className={classes.mTop8}
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
  loadMeals: () => dispatch(fetchMeals())
})

export default withStyles(globalStyles)(
  withRouter(connect(mapState, mapDispatch)(MealDetails))
)

MealDetails.propTypes = {
  classes: PropTypes.object.isRequired
}
