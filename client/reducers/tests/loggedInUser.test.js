import loggedInUserReducer from '../loggedInUser'
import { setLoggedInUser } from '../../actions/loggedInUser'
import { newUser } from '../../../tests/fake-data'

describe('logged in user reducers', () => {
  const emptyUser = {
    auth0Id: '',
    email: '',
    token: '',
  }
  test('it should get the details for a logged in user', () => {
    const action = setLoggedInUser(newUser)
    const newState = loggedInUserReducer(emptyUser, action)
    expect(newState.email).toBe('random17@gmail.com')
  })
})
