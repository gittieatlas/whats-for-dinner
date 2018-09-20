import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Typography, Grid} from '@material-ui/core'
import MealItem from './MealItem'
import {gridSpacing} from '../Utils/Numbers'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

export class MealList extends Component {
  render() {
    const {classes} = this.props
    return (
      <div>
        <Typography
          variant="title"
          color="secondary"
          align="center"
          className={classes.header}
        >
          All Meals
        </Typography>

        <Grid container spacing={gridSpacing}>
          {this.props.meals.map(meal => <MealItem meal={meal} key={meal.id} />)}
        </Grid>
      </div>
    )
  }
}

const mapState = ({meals}) => ({meals})

MealList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(globalStyles)(connect(mapState)(MealList))
