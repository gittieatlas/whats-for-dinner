// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// MealsList component
import {shallow} from 'enzyme'
import React from 'react'
import MealsList from './MealList'

import {createShallow} from '@material-ui/core/test-utils'

describe('Front-End', () => {
  const meals = [
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

  describe('<MealsList /> component', () => {
    it('renders an unordered list', () => {
      const wrapper = shallow(<MealsList meals={[]} />)
      expect(wrapper.find('grid')).to.have.length(1)
    })

    it('renders list items for the meals passed in as props', () => {
      const mealRecords = meals
      const wrapper = shallow(<MealsList meals={mealRecords} />)
      const listItems = wrapper.find('li') // OB: can `.find(MealItem)`
      expect(listItems).to.have.length(2)
      // expect(listItems.at(1).text()).to.contain(meals[1].name)
    })
  })

  describe('<MealsList />', () => {
    let shallow

    before(() => {
      shallow = createShallow()
    })

    it('should work', () => {
      const wrapper = shallow(<MealsList meals={[]} />)
      // OB: `.dive` will probably be important, cool! `.dive` deeply renders the component
      expect(wrapper.dive().find(MealsList)).toHaveLength(1)
      // expect(wrapper.find('grid')).to.have.length(1)
    })
  })
})
