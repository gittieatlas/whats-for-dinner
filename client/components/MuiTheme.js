import {createMuiTheme} from '@material-ui/core/styles'

import {lightOrange, lightGray} from '../components/Utils/Colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightOrange
    },
    secondary: {
      main: lightGray
    }
  },
  typography: {
    fontFamily: 'Muli, serif'
  }
})

export default theme
