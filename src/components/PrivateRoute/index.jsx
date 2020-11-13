import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import WithLoginStatus from '../../containers/WithLoginStatus'
import PropTypes from 'prop-types'

const PrivateRoute = ({ loggedIn, ...otherProps }) => {
  const location = useLocation()
  return loggedIn
    ? <Route {...otherProps} />
    : <Redirect to={{
      pathname: '/login',
      state: { from: location }
    }} />
}

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool
}

export default WithLoginStatus(PrivateRoute)
