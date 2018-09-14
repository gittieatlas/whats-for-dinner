export default theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1
  },
  inlineFlex: {
    display: 'inline-flex'
  },
  header: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 8
  },
  media: {
    objectFit: 'scale-down'
  },
  mTop8: {
    marginTop: theme.spacing.unit * 8
  }
})
