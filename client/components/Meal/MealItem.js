import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea
} from '@material-ui/core'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

const MealItem = props => {
  const {meal, classes} = props
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            image={meal.imageUrl}
            title={meal.name}
          />
          <CardContent>
            <Typography gutterBottom variant="subheading" align="center">
              {meal.name}
            </Typography>
            <Typography align="center" color="secondary">
              {`From $${meal.sizes[0].price} for ${meal.sizes[0].size}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default withStyles(globalStyles)(MealItem)

MealItem.propTypes = {
  classes: PropTypes.object.isRequired
}