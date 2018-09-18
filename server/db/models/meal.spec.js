/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Meal = db.model('meal')

describe.only('Meal model', () => {
  describe('Validations', () => {
    it('requires name', async () => {
      const meal = Meal.build({
        shortDescription: 'with roasted sweet potatoes and fattoush salad',
        longDescription:
          'A little marinade goes a long way with our flavorful Mediterranean-Spiced Grilled Chicken that can be prepared on the stove or grill. The crisp, roasted sweet potatoes add a savory complement to the spice and the fattoush salad rounds everything out with a refreshing side of veggies.',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_20_800x.png?v=1531271400',
        servings: '2',
        price: 3800
      })

      try {
        await meal.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires name to not be an empty string', async () => {
      const meal = Meal.build({
        name: '',
        shortDescription: 'with roasted sweet potatoes and fattoush salad',
        longDescription:
          'A little marinade goes a long way with our flavorful Mediterranean-Spiced Grilled Chicken that can be prepared on the stove or grill. The crisp, roasted sweet potatoes add a savory complement to the spice and the fattoush salad rounds everything out with a refreshing side of veggies.',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_20_800x.png?v=1531271400',
        servings: '2',
        price: 3800
      })

      try {
        await meal.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error') // OB: might be too wide a net, could produce false positives
      }
    })

    it('requires price', async () => {
      const meal = Meal.build({
        name: 'Mediterranean-Spiced Grilled Chicken',
        shortDescription: 'with roasted sweet potatoes and fattoush salad',
        longDescription:
          'A little marinade goes a long way with our flavorful Mediterranean-Spiced Grilled Chicken that can be prepared on the stove or grill. The crisp, roasted sweet potatoes add a savory complement to the spice and the fattoush salad rounds everything out with a refreshing side of veggies.',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_20_800x.png?v=1531271400',
        servings: '2'
      })

      try {
        await meal.validate()
        // OB: can lead to awkward mocha reporting, consider using `chai-as-promised`, which would allow you to do `cosnt err = await expect(meal.validate()).to.be.rejected`
        throw Error(
          'validation was successful but should have failed without `price`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })

    it('should have a servings property of either "2", "4", or "6" (nothing else)', async () => {
      const meal = Meal.build({
        name: 'Mediterranean-Spiced Grilled Chicken',
        shortDescription: 'with roasted sweet potatoes and fattoush salad',
        longDescription:
          'A little marinade goes a long way with our flavorful Mediterranean-Spiced Grilled Chicken that can be prepared on the stove or grill. The crisp, roasted sweet potatoes add a savory complement to the spice and the fattoush salad rounds everything out with a refreshing side of veggies.',
        imageUrl:
          'https://cdn.shopify.com/s/files/1/0006/0227/5901/products/2018-06-CoCoBox_JenMayPhoto_20_800x.png?v=1531271400',
        servings: '2',
        price: 3800
      })

      // confirming these work fine
      await meal.save()
      meal.servings = '4'
      await meal.save()
      meal.servings = '6'
      await meal.save()

      // confirming this doesn't work at all
      try {
        meal.servings = '8'
        await meal.save()
      } catch (err) {
        expect(err.message).to.contain('servings')
        return // everything is fine, so stop this spec.
      }

      // if we got here, that means we DIDN'T fail above, which is wrong.
      throw Error(
        'Trying to `save` a meal with invalid `servings` should have failed.'
      )
    })
  })
})
