/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Meal = db.model('meal')
const Size = db.model('size')

describe('Meal routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Promise.all([Meal.truncate({cascade: true})])
  })

  describe('/api/meals/', () => {
    const mealObj = {
      name: 'Dijon Salmon',
      shortDescription: 'with roasted mushrooms shallots and arugula salad',
      longDescription:
        'Salmon and mushrooms are an unlikely, yet beautiful flavor pairing that really sings when baked. This is a hands-off recipe that’ll leave you wondering why you’ve never tried this delightful combo before. But hey, at least you know now!',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_62_800x.png?v=1531271488'
    }
    const {name, shortDescription, longDescription, imageUrl} = mealObj

    // TODO: capture meal instance and add sizes after creating Meal
    let meal = {}

    const sizesObj = [
      {price: '38', size: '2', mealId: meal.id},
      {price: '68', size: '4', mealId: meal.id},
      {price: '108', size: '6', mealId: meal.id}
    ]
    const {size, price} = sizesObj[0]

    beforeEach(async () => {
      meal = await Meal.create(mealObj)
      sizesObj.map(s => ({
        ...s,
        mealId: meal.id
      }))
      return Size.bulkCreate(sizesObj)
    })

    it('GET /api/meals', async () => {
      const res = await request(app)
        .get('/api/meals')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[1].name).to.be.equal(name)
      expect(res.body[2].shortDescription).to.be.equal(shortDescription)
      expect(res.body[3].longDescription).to.be.equal(longDescription)
      expect(res.body[4].name).to.be.equal(imageUrl)
      expect(res.body[4].name).to.be.equal(imageUrl)
      expect(res.body[7].sizes).to.be.an('array')
      expect(res.body[7].sizes[0].size).to.be.equal(size)
      expect(res.body[7].sizes[0].price).to.be.equal(price)
      // TODO sort size array
    })
  }) // end describe('/api/meals')
}) // end describe('Meal routes')
