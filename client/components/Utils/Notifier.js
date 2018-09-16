import React from 'react'
import PropTypes from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import {withStyles} from '@material-ui/core/styles'
import styles from './Notifier.css'

let openSnackbarFn

class Notifier extends React.Component {
  state = {
    open: false,
    message: ''
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar
  }

  openSnackbar = ({message}) => {
    this.setState({
      open: true,
      message
    })
  }

  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: ''
    })
  }

  render() {
    const {classes} = this.props
    return (
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        message={<span id="message-id">{this.state.message}</span>}
        autoHideDuration={6000}
        onClose={this.handleSnackbarClose}
        open={this.state.open}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }
}

export function openSnackbar({message}) {
  openSnackbarFn({message})
}

export default withStyles(styles)(Notifier)

Notifier.propTypes = {
  classes: PropTypes.object.isRequired
}
