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
  decreaseItemCount,
  addToCart
} from '../../store/cart'
import {toCurrency} from '../../utils/stringUtils'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

class Cart extends Component {
  render() {
    const {classes, cart, meals, cartTotal} = this.props

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
                  const meal = meals.find(
                    mealToFind => mealToFind.id === Number(mealId)
                  )

                  return (
                    <CartItem
                      key={meal.id}
                      meal={meal}
                      count={cart[mealId]}
                      handleRemoveFromCart={() => this.props.removeItem(mealId)}
                      handleDecreaseItemCount={
                        cart[mealId] !== 1
                          ? () => this.props.decreaseItem(mealId)
                          : () => this.props.removeItem(mealId)
                      }
                      handleIncreaseItemCount={() =>
                        this.props.addToCart(mealId)
                      }
                    />
                  )
                })}
              </TableBody>
            </Table>

            <div className={classNames(classes.alignerRight, classes.mTop4)}>
              <Typography variant="title" color="textPrimary">
                Total: {toCurrency(cartTotal)}
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

const mapDispatch = dispatch => ({
  removeItem: mealId => dispatch(removeFromCart(mealId)),
  addToCart: mealId => dispatch(addToCart(mealId)),
  decreaseItem: mealId => dispatch(decreaseItemCount(mealId))
})

Cart.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(globalStyles)(connect(mapState, mapDispatch)(Cart))
