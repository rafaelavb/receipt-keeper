import { useDispatch, useSelector } from 'react-redux'
// import { setLoggedInUser } from './actions/loggedInUser'

// eslint-disable-next-line no-unused-vars
export async function cacheUser(useAuth0) {
  const dispatch = useDispatch()
  // const loggedInUser = useSelector((state) => state.loggedInUser)
  const result = useAuth0()
  const { getAccessTokenSilently, isAuthenticated, user } = result

  // TODO: call the useAuth0 and destructure:
  // isAuthenticated, getAccessTokenSilently and user

  // const isAuthenticated = false // <- TODO: delete this and use the value from useAuth0()

  if (isAuthenticated && !loggedInUser?.token) {
    try {
      const token = await getAccessTokenSilently()
      const userToSave = {
        auth0Id: user.sub,
        email: user.email,
        token: token,
      }
      // dispatch(setLoggedInUser(userToSave))
    } catch (err) {
      console.error(err)
    }
  }
}
