import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {auth} from '../../store'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'
import globalStyles from '../Utils/GlobalStyles.css'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <div className={classes.layoutSmall}>
      <Paper className={classes.paper}>
        <Avatar className={classNames(classes.avatar, classes.primaryAvatar)}>
          <LockIcon />
        </Avatar>
        <Typography variant="headline"> {displayName}</Typography>
        <form onSubmit={handleSubmit} name={name} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {displayName}
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <span className={classes.mTop2}>OR</span>
        <Button
          variant="contained"
          color="primary"
          href="/auth/google"
          fullWidth
          className={classes.mTop2}
        >
          {displayName} with Google
        </Button>
      </Paper>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withStyles(globalStyles)(
  connect(mapLogin, mapDispatch)(AuthForm)
)
export const Signup = withStyles(globalStyles)(
  connect(mapSignup, mapDispatch)(AuthForm)
)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
