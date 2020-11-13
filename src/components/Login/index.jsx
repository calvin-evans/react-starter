import React from 'react'
import { connect } from 'react-redux'
import { LOGIN_ATTEMPT } from '../../ducks/auth'
import Button from '../Button'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, loggedIn, loggingIn }) => {
  const login = () => handleLogin({ email: 'ceuk.dev@gmail.com', password: 'abcd1234' })
  return (
    <div>
      {loggedIn ? 'LOGGED IN' : <Button onClick={login}>Click Me</Button>}
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  loggedIn: PropTypes.bool,
  loggingIn: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser,
    loggingIn: state.auth.loggingIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: ({ email, password }) => dispatch(LOGIN_ATTEMPT({ email, password }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
