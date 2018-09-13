import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FFBDB8',
      main: '#ffcc9f',
      dark: '#ED7100',
      contrastText: '#000'
    },
    secondary: {
      light: '#ECEFF1',
      main: '#b0bec5',
      dark: '#607D8B',
      contrastText: '#000'
    }
  }
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <div>
          <Navbar />
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <Routes />
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  )
}

export default App
