import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Toasts from './Toasts'
import layoutStyles from '../styles/Layout.module.scss'
import Nav from '../components/Nav'

class Layout extends React.Component {
  render () {
    return (
      <Router>
        <div className={layoutStyles.root}>
          <Nav />
          <div className={layoutStyles.content}>
            {this.props.children}
          </div>
        </div>
      </Router>
    )
  }
}

export default Layout
