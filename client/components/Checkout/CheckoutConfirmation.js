import React, {Fragment} from 'react'
import Typography from '@material-ui/core/Typography'

const CheckoutConfirmation = ({orderNumber}) => {
  return (
    <Fragment>
      <Typography variant="headline" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subheading">
        Your order number is {orderNumber}.
      </Typography>
    </Fragment>
  )
}
export default CheckoutConfirmation
