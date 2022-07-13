import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'
import store from './store'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Auth0Provider
      domain="lauren-dev.us.auth0.com"
      clientId="SKeBa9ehP66l3jMJho14gkmrbz46Bmew"
      redirectUri={window.location.origin}
      audience="https://receipts/api"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>,
    document.getElementById('app')
  )
})
