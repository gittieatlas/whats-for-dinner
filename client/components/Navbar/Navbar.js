import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import {Fastfood} from '@material-ui/icons'
import {logout} from '../../store'

import {withStyles} from '@material-ui/core/styles'
import styles from './Navbar.css'
import globalStyles from '../Utils/GlobalStyles.css'

const Navbar = ({handleClick, isLoggedIn, classes, email}) => (
  <AppBar position="static" color="primary" className={classes.appBar}>
    <Toolbar>
      <Link to="/" className={classNames(classes.grow, classes.inlineFlex)}>
        <Fastfood color="secondary" className={classes.icon} />
        <Typography variant="title" color="secondary" noWrap>
          What's for Dinner
        </Typography>
      </Link>

      <Button
        component={Link}
        to="/cart"
        color="secondary"
        variant="outlined"
        className={classes.icon}
      >
        View Cart
      </Button>

      {isLoggedIn ? (
        <div className={classNames(classes.row, classes.icon)}>
          {/* The navbar will show these links after you log in */}
          <Button onClick={handleClick} color="secondary" variant="outlined">
            Logout
          </Button>
          <Avatar className={classes.iconLeft} component="button">
            {email.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Button
            component={Link}
            to="/login"
            color="secondary"
            variant="outlined"
            className={classes.icon}
          >
            Login
          </Button>

          <Button
            component={Link}
            to="/signup"
            color="secondary"
            variant="outlined"
          >
            Sign Up
          </Button>
        </div>
      )}
    </Toolbar>
  </AppBar>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(theme => ({
  ...globalStyles(theme),
  ...styles(theme)
}))(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  email: PropTypes.string
}
