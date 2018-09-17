// assertions
import chai from 'chai'
const expect = chai.expect
import chaiThings from 'chai-things'
chai.use(chaiThings)

// redux
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

// meals reducer
import {SET_MEALS, setMeals, fetchMeals} from './meals'

describe.only('Meals Reducer', () => {
  let store
  let mockAxios
  let actions

  const initialState = {meals: []}

  const fakeMeals = [
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

  beforeEach(async () => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)

    mockAxios.onGet('/api/meals').replyOnce(200, fakeMeals)
    await store.dispatch(fetchMeals(fakeMeals))
    actions = store.getActions()
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetch meals', () => {
    it('eventually dispatches the SET_MEALS action', () => {
      expect(actions[0]).to.be.deep.equal(setMeals(fakeMeals))
      expect(actions[0].type).to.be.equal(SET_MEALS)
      expect(actions[0].meals).to.be.deep.equal(fakeMeals)
    })

    xit('store has new state with the fetched meals', () => {
      // TODO: how to test that the state changed?
      // state.meals is empty array at this point
      // expect(store.getState().meals).to.deep.equal(fakeMeals)
      // expect(store.getState().meals).to.have.length(2)
    })
  })
})
