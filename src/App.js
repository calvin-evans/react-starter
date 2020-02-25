import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import './styles/global.scss'
import Layout from './containers/Layout'

const Index = () => <h2>Home</h2>

const AppRoutes = () => (
  <Layout>
    <Switch>
      <Route path='/' exact component={Index} />
    </Switch>
  </Layout>
)

export default AppRoutes

