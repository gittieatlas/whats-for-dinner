import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import withStyles from '@material-ui/core/styles/withStyles'
import globalStyles from '../Utils/GlobalStyles.css'
import styles from './Checkout.css'
import {saveDeliveryInfo, postOrder} from '../../store/checkout'
import {selectCartTotal} from '../../store/cart'
import {CartEmpty} from '..'
import CheckoutConfirmation from './CheckoutConfirmation'

class Checkout extends Component {
  state = {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  }

  handleUserInput = event => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleSubmit = async event => {
    event.preventDefault()

    // OB: could do either local state or redux store state, don't need both
    await this.props.saveDeliveryInfo({...this.state})
    // OB: if you return from the thunk you could capture the id and set it on state (and they you won't have to clear it properly)
    this.props.postOrder()
  }

  render() {
    const {handleSubmit, handleUserInput} = this
    const {classes, cart, orderNumber} = this.props

    const itemInCart = Object.keys(cart).length
    return (
      <div className={classes.layoutMedium}>
        <Typography
          variant="display1"
          align="center"
          className={classes.header}
        >
          Checkout
        </Typography>

        {!orderNumber ? ( // OB: invert this ternary, smaller "case" should come first
          <Fragment>
            {!itemInCart ? (
              <CartEmpty />
            ) : (
              <form
                onSubmit={handleSubmit}
                name={name}
                className={classes.form}
              >
                <Typography variant="title" gutterBottom>
                  Delivery Information
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address1"
                      name="address1"
                      label="Address line 1"
                      fullWidth
                      autoComplete="billing address-line1"
                      onChange={handleUserInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address line 2"
                      fullWidth
                      autoComplete="billing address-line2"
                      onChange={handleUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      autoComplete="billing address-level2"
                      onChange={handleUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="State/Province/Region"
                      fullWidth
                      onChange={handleUserInput}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      minLength="5"
                      id="zip"
                      name="zip"
                      label="Zip / Postal code"
                      fullWidth
                      autoComplete="billing postal-code"
                      onChange={handleUserInput}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      minLength="10"
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      fullWidth
                      autoComplete="tel"
                      onChange={handleUserInput}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  Place order
                </Button>
              </form>
            )}
          </Fragment>
        ) : (
          <CheckoutConfirmation orderNumber={orderNumber} />
        )}
      </div>
    )
  }
}

// OB: could define an "inverseSelector" HERE for sending the form data back to the store

const mapState = ({cart, meals, checkout}) => {
  return {
    cartTotal: selectCartTotal(cart, meals),
    cart,
    meals,
    orderNumber: checkout && checkout.orderNumber
  }
}

const mapDispatch = dispatch => ({
  saveDeliveryInfo: deliveryData => dispatch(saveDeliveryInfo(deliveryData)),
  postOrder: () => dispatch(postOrder())
})

// OB: might be able to use an object compose utility, like I think it exists in lodash maybe? ramda?
export default withStyles(theme => ({
  ...globalStyles(theme),
  ...styles(theme)
}))(connect(mapState, mapDispatch)(Checkout))

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}
