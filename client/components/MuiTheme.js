import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      // OB: recommend naming any "magic numbers" / "magic strings"
      main: '#f9dbc0'
    },
    secondary: {
      main: '#607D8B'
    }
  },
  typography: {
    fontFamily: 'Muli, serif'
  }
})

export default theme
