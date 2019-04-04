import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGIN_RESTORED } from '../ducks/auth'
import Toasts from './Toasts'
import layoutStyles from '../styles/Layout.module.scss'
import Nav from '../components/Nav'

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: ({ id, token }) => dispatch(LOGIN_RESTORED({ id, token }))
  }
}

class Layout extends React.Component {
  constructor(props) {
    super(props)
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      this.props.restoreSession(JSON.parse(currentUser))
    }
  }
  render() {
    return (
      <Router>
        <div>
          <Toasts messages={[ { title: 'Logged in', status: 'success' }, { title: 'Something went wrong', status: 'error', text: 'Please try again later' } ]} />
          <div className={layoutStyles.root}>
            {!window.location.pathname.includes('login') && (
              <Nav />
            )}
            <div className={layoutStyles.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default connect(null, mapDispatchToProps)(Layout)
