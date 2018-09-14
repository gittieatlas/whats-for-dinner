import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Typography} from '@material-ui/core'

import {withStyles} from '@material-ui/core/styles'
import styles from './Footer.css'
import globalStyles from '../Utils/GlobalStyles.css'

const footerData = [
  {
    title: 'Quick Links',
    description: [
      {text: 'all meals'},
      {text: 'about'},
      {text: 'contact us'},
      {
        text: 'questions',
        onClick: e => {
          e.preventDefault()
          const mailToLink = 'mailto:hello@whatsfordinner.com'
          window.location = mailToLink
        }
      }
    ]
  },
  {
    title: 'shop by meal type',
    description: [
      {text: 'meat'},
      {text: 'chicken'},
      {text: 'fish'},
      {text: 'vegan'},
      {text: 'kids'}
    ]
  },
  {
    title: '--',
    description: [{text: 'Privacy policy'}, {text: 'Terms of use'}]
  }
]

const Footer = ({classes}) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.layout}>
        <Grid container spacing={32} justify="space-evenly">
          {footerData.map(footer => (
            <Grid item xs key={footer.title}>
              <Typography variant="title" color="secondary" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map(item => (
                <Typography
                  key={item.text}
                  variant="subheading"
                  color="secondary"
                  onClick={item.onClick && item.onClick}
                >
                  {item.text}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="caption"
          color="secondary"
          align="center"
          className={classes.mTop8}
        >
          {`\u00A9 What's for Dinner`}
        </Typography>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(theme => ({
  ...globalStyles(theme),
  ...styles(theme)
}))(Footer)
