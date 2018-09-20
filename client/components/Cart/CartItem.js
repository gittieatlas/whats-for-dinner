import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import {toCurrency} from '../../utils/stringUtils'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

const CartItem = props => {
  const {
    classes,
    meal,
    count,
    handleRemoveFromCart,
    handleIncreaseItemCount,
    handleDecreaseItemCount
  } = props
  return (
    <TableRow key={meal.id}>
      <TableCell>
        <div className={classes.inlineFlex}>
          <CardMedia
            component="img"
            className={classes.thumbnail}
            image={meal.imageUrl}
            title={meal.name}
          />
          <div className={classes.alignerColumn}>
            <Typography
              variant="subheading"
              color="textPrimary"
              className={classes.mTop2}
            >
              {meal.name}
            </Typography>
            <Typography
              variant="subheading"
              color="secondary"
              className={classes.mTop2}
            >
              {`Serves ${meal.servings}`} <br />
              {toCurrency(meal.price)}
            </Typography>
          </div>
        </div>
      </TableCell>
      <TableCell className={classes.textCenter}>
        <div className={classes.aligner}>
          <IconButton
            className={classNames(classes.button, classes.icon)}
            aria-label="Add"
            onClick={handleIncreaseItemCount}
          >
            <AddIcon />
          </IconButton>

          <Typography
            variant="subheading"
            color="textPrimary"
            className={classNames(classes.icon, classes.alignMiddle)}
          >
            {count}
          </Typography>

          <IconButton
            className={classes.button}
            aria-label="Remove"
            fontSize="small"
            onClick={handleDecreaseItemCount}
          >
            <RemoveIcon />
          </IconButton>
        </div>
        <Button className={classes.button} onClick={handleRemoveFromCart}>
          Remove
        </Button>
      </TableCell>
      <TableCell numeric> {toCurrency(meal.price)}</TableCell>
    </TableRow>
  )
}

export default withStyles(globalStyles)(CartItem)

CartItem.propTypes = {
  classes: PropTypes.object.isRequired
}
