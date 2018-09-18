import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import CartItem from './CartItem'
import {CartEmpty} from '../index'
import {
  selectCartTotal,
  removeFromCart,
  increaseItemCount,
  decreaseItemCount
} from '../../store/cart'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

class Cart extends Component {
  // OB: might be unnecessary abstraction (I lean towards remove it)
  handleRemoveFromCart = mealId => {
    this.props.removeItem(mealId)
  }

  handleIncreaseItemCount = mealId => {
    this.props.increaseItem(mealId)
  }

  handleDecreaseItemCount = mealId => {
    this.props.decreaseItem(mealId)
  }

  render() {
    const {classes, cart, meals, cartTotal} = this.props
    const {
      handleRemoveFromCart,
      handleDecreaseItemCount,
      handleIncreaseItemCount
    } = this
    return (
      <div>
        <Typography
          variant="display1"
          align="center"
          className={classes.header}
        >
          Cart
        </Typography>
        {!Object.keys(cart).length ? (
          <CartEmpty />
        ) : (
          <Fragment>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell className={classes.textCenter}>Quantity</TableCell>
                  <TableCell numeric>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(cart).map(mealId => {
                  // OB: looks like your meal selector, could reuse it
                  const meal = meals.find(
                    mealToFind => mealToFind.id === Number(mealId)
                  )
                  return (
                    <CartItem
                      key={meal.id}
                      meal={meal}
                      count={cart[mealId]}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleDecreaseItemCount={
                        cart[mealId] !== 1
                          ? handleDecreaseItemCount
                          : handleRemoveFromCart
                      }
                      handleIncreaseItemCount={handleIncreaseItemCount}
                    />
                  )
                })}
              </TableBody>
            </Table>

            <div className={classNames(classes.alignerRight, classes.mTop4)}>
              <Typography variant="title" color="textPrimary">
                {/* OB: might be worth a util */}
                Total: {`$${(cartTotal / 100).toFixed(0)}`}
              </Typography>
            </div>

            <div className={classNames(classes.alignerRight, classes.mTop4)}>
              <Button
                component={Link}
                to="/checkout"
                variant="raised"
                color="primary"
                className={classes.button}
              >
                Checkout
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

const mapState = ({cart, meals}) => {
  return {
    cartTotal: selectCartTotal(cart, meals),
    cart,
    meals
  }
}

// OB: object format for `mapDispatchToProps`...
/*
// for common use cases, can do:
const mapDispatch = {
  removeItem: removeFromCart,
  increaseItem: increaseItemCount,
  decreaseItem: decreaseItemCount
};
*/
const mapDispatch = dispatch => ({
  removeItem: mealId => dispatch(removeFromCart(mealId)),
  increaseItem: mealId => dispatch(increaseItemCount(mealId)),
  decreaseItem: mealId => dispatch(decreaseItemCount(mealId))
})

Cart.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(globalStyles)(connect(mapState, mapDispatch)(Cart))
