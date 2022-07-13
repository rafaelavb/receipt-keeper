import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

const isAuthenticatedFn = () => {
  return useAuth0().isAuthenticated
}

export function IfAuthenticated({ children }) {
  return isAuthenticatedFn() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }) {
  return !isAuthenticatedFn() ? <>{children}</> : null
}
