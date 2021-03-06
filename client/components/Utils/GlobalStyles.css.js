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
  layoutMedium: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  layoutSmall: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  iconLeft: {
    marginLeft: theme.spacing.unit * 2
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
  },
  mTop4: {
    marginTop: theme.spacing.unit * 4
  },
  mTop2: {
    marginTop: theme.spacing.unit * 2
  },
  primaryAvatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  table: {
    minWidth: 700
  },
  textCenter: {
    textAlign: 'center'
  },
  thumbnail: {
    width: theme.spacing.unit * 24,
    height: theme.spacing.unit * 24,
    objectFit: 'scale-down'
  },
  alignMiddle: {
    verticalAlign: 'middle'
  },
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignerColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  alignerRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  }
})
