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
    orderNumber: null
  }

  handleSubmit = async event => {
    event.preventDefault()
    const deliveryData = {
      shippingAddress: {
        address1: event.target.address1.value,
        address2: event.target.address2.value,
        city: event.target.city.value,
        state: event.target.state.value,
        zip: event.target.zip.value
      },
      phoneNumber: event.target.phone.value
    }

    console.log(deliveryData)

    await this.props.saveDeliveryInfo(deliveryData)

    const orderNumber = await this.props.postOrder()
    this.setState({orderNumber})
  }

  render() {
    const {handleSubmit} = this
    const {classes, cart} = this.props
    const {orderNumber} = this.state

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

        {orderNumber ? (
          <CheckoutConfirmation orderNumber={orderNumber} />
        ) : (
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address line 2"
                      fullWidth
                      autoComplete="billing address-line2"
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="State/Province/Region"
                      fullWidth
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
  saveDeliveryInfo: deliveryData => dispatch(saveDeliveryInfo(deliveryData)),
  postOrder: () => dispatch(postOrder())
})

export default withStyles(theme => ({
  ...globalStyles(theme),
  ...styles(theme)
}))(connect(mapState, mapDispatch)(Checkout))

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}
