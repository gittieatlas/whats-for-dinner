import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Navbar, Footer} from './components'
import Routes from './Routes'
import MuiTheme from './components/MuiTheme'
import {CssBaseline} from '@material-ui/core'
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles'
import {fetchMeals} from './store/meals'
import globalStyles from './components/Utils/GlobalStyles.css'
import {withRouter} from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.fetchInitialData()
  }
  render() {
    const {classes} = this.props
    return (
      <MuiThemeProvider theme={MuiTheme}>
        <React.Fragment>
          <CssBaseline />
          {/* <!-- start components --> */}
          <Navbar />
          <main className={classes.layout}>
            <Routes />
          </main>
          <Footer />
          {/* <!-- end components --> */}
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const mapState = null

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchMeals())
  }
})

export default withStyles(globalStyles)(
  withRouter(connect(mapState, mapDispatch)(App))
)

App.propTypes = {
  classes: PropTypes.object.isRequired
}
