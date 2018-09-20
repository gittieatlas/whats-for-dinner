/* global describe beforeEach afterEach it */

const {expect} = require('chai')
const db = require('../db')
const app = require('..')
const agent = require('supertest')(app)
const Meal = db.model('meal')

describe('Meal routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Promise.all([Meal.truncate({cascade: true})])
  })

  const mealData = [
    {
      name: 'Mediterranean-Spiced Grilled Chicken',
      shortDescription: 'with roasted sweet potatoes and fattoush salad',
      longDescription:
        'A little marinade goes a long way with our flavorful Mediterranean-Spiced Grilled Chicken that can be prepared on the stove or grill. The crisp, roasted sweet potatoes add a savory complement to the spice and the fattoush salad rounds everything out with a refreshing side of veggies.',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_20_800x.png?v=1531271400',
      servings: '2',
      price: 3800
    },
    {
      name: 'Dijon Salmon',
      shortDescription: 'with roasted mushrooms shallots and arugula salad',
      longDescription:
        'Salmon and mushrooms are an unlikely, yet beautiful flavor pairing that really sings when baked. This is a hands-off recipe that’ll leave you wondering why you’ve never tried this delightful combo before. But hey, at least you know now!',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_62_800x.png?v=1531271488',
      servings: '4',
      price: 8800
    }
  ]

  beforeEach(() => {
    return Meal.bulkCreate(mealData, {returning: true})
  })

  // Route for fetching all meals
  describe('GET `/api/meals`', () => {
    it('serves up all Meals', async () => {
      const response = await agent.get('/api/meals').expect(200)

      expect(response.body).to.have.length(2)

      expect(response.body[0].name).to.equal(mealData[1].name)
      expect(response.body[0].servings).to.equal(mealData[1].servings)

      expect(response.body[1].name).to.equal(mealData[0].name)
      expect(response.body[1].servings).to.equal(mealData[0].servings)
    })
  })
})
