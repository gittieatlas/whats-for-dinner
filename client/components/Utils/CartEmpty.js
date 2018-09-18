import React from 'react'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import globalStyles from './GlobalStyles.css'

const CartEmpty = ({classes}) => (
  <Typography variant="subheading" color="textPrimary" align="center">
    Your cart is empty<br />
    <Button
      component={Link}
      to="/meals"
      color="primary"
      variant="raised"
      className={classes.mTop4}
    >
      Shop our meals
    </Button>
  </Typography>
)

export default withStyles(globalStyles)(CartEmpty)
