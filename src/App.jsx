import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import WithCachedCredentials from './containers/WithCachedCredentials'
import PropTypes from 'prop-types'

const App = ({ restoreSession }) => {
  useEffect(() => {
    restoreSession()
  }, [restoreSession])
  return (
    <div className='App'>
      <Router>
        <Switch>
          <PrivateRoute path='/' exact component={() => 'home'} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  )
}

App.propTypes = {
  restoreSession: PropTypes.func
}

export default WithCachedCredentials(App)
