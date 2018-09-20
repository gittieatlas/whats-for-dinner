//Enzyme
import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
const adapter = new Adapter()
enzyme.configure({adapter})
import {createShallow} from '@material-ui/core/test-utils'

// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// MealsList component
import React from 'react'
import {MealList} from './MealList'
import {MealItem} from './MealItem'
import globalStyles from '../Utils/GlobalStyles.css'
import {withStyles} from '@material-ui/core/styles'
const StyledMealList = withStyles(globalStyles)(MealList)
import Typography from '@material-ui/core/Typography'

describe.only('<MealsList /> component', () => {
  let shallow

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

  before(() => {
    shallow = createShallow()
  })

  it('should work', () => {
    const wrapper = shallow(<StyledMealList meals={[]} />)
    expect(wrapper.dive().find(<MealItem />)).to.have.length(0)
  })

  it(`renders a title "All Meals"`, () => {
    const wrapper = shallow(<StyledMealList meals={meals} />)
    const target = <Typography>All Meals</Typography>
    expect(wrapper.dive().containsMatchingElement(target)).to.equal(true)
  })

  xit('WIP: renders list items for the meals passed in as props', () => {
    const wrapper = shallow(<StyledMealList meals={meals} />)

    console.log(wrapper.dive().debug())
    const listItems = wrapper.dive().find(<MealItem />)
    expect(listItems).to.have.length(2)
    expect(listItems.at(1).text()).to.contain(meals[1].name)
  })
})
