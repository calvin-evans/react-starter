import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import App from './App'
import messageReducer from './ducks/messages'
import * as serviceWorker from './serviceWorker'

// Redux/Saga

const sagaMiddleware = createSagaMiddleware()

function * rootSaga () {
  yield all([
  ])
}

const middleware = [
  ...getDefaultMiddleware(),
  sagaMiddleware
]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}
const store = configureStore({
  reducer: {
    messages: messageReducer
  },
middleware})

sagaMiddleware.run(rootSaga)

// End Redux/Saga

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))

serviceWorker.unregister()
