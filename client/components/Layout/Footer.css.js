export default theme => ({
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
    backgroundColor: theme.palette.primary.main
  },
  a: {
    color: theme.palette.secondary.main,
    cursor: 'default',
    '&:hover': {
      color: theme.palette.secondary.light,
      cursor: 'pointer'
    }
  }
})
