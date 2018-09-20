export const toCurrency = integerString =>
  `$${(integerString / 100).toFixed(0)}`
