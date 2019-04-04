import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { LOGIN_RESTORED } from '../ducks/auth'
import Toasts from './Toasts'
import layoutStyles from '../styles/Layout.module.scss'
import Nav from '../components/Nav'

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: ({ id, token }) => dispatch(LOGIN_RESTORED({ id, token}))
  }
}

class Layout extends React.Component {
  constructor (props) {
    super(props)
    const cachedUser = localStorage.getItem('currentUser')
    if (cachedUser) {
      this.props.restoreSession(JSON.parse(cachedUser))
    }
  }
  render () {
    return (
      <Router>
        <div>
          <Toasts messages={[ { title: 'Logged in', status: 'success' }, { title: 'Something went wrong', status: 'error', text: 'Please try again later' } ]} />
          <div className={layoutStyles.root}>
            {this.props.currentUser && <Nav />}
            <div className={layoutStyles.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
