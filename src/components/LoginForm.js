import React, { useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import Button from '../components/Button'
import Input from '../components/Input'
import Form from '../components/Form'
import Field from '../components/Form/Field'
import loginStyles from '../styles/LoginForm.module.scss'

const LoginForm = ({ handleLogin, loggingIn, loggedIn, location }) => {
  const formRef = useRef()

  const handleSubmit = ({ values, valid, warnings }) => {
    if (valid) {
      handleLogin(values)
    }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) {
      // submit when return key is pressed
      formRef.current.submit(e)
    }
  }

  return (
    <div className={loginStyles.root}>
      <Form ref={formRef} onSubmit={handleSubmit} className={loginStyles.container}>
        <FiUser className={loginStyles.icon} />
        <h1 className={loginStyles.heading}>Log in</h1>
        <Field validations={['isEmail']}>
          <Input
            onKeyUp={handleKeyUp}
            style={{ width: '100%' }}
            type="email"
            icon="Mail"
            placeholder="Email Address"
            autoComplete="email-address"
            name="email" />
        </Field>
        <Field>
          <Input
            onKeyUp={handleKeyUp}
            style={{ width: '100%' }}
            type="password"
            icon="Lock"
            placeholder="Password"
            autoComplete="current-password"
            name="password" />
        </Field>
        <Button type="submit" loading={loggingIn} style={{ width: '100%' }}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </Button>
      </Form>
      {loggedIn && <Redirect to={location.state && location.state.from && location.state.from.pathname ? location.state.from.pathname : '/'} />}
    </div>
  )
}

export default LoginForm
