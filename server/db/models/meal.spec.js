/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Meal = db.model('meal')

describe('Meal model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('what to test?', () => {
    // TODO: how do we test models
  }) // end describe('what to test?')
}) // end describe('Meal model')
