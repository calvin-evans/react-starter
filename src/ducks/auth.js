import { createSlice } from 'redux-starter-kit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SHOW_MESSAGE } from './messages'
import API, { updateToken } from '../api'

const { actions, reducer } = createSlice({
  initialState: {
    currentUser: false,
    loggingIn: false,
    byId: {}
  },
  reducers: {
    LOGIN_ATTEMPT(state, { payload }) {
      state.loggingIn = true
    },
    LOGIN_SUCCESS(state, { payload }) {
      state.currentUser = payload.id
      state.loggingIn = false
      state.byId[payload.id] = payload
    },
    LOGIN_FAILED(state, { payload }) {
      state.currentUser = null
      state.loggingIn = false
      state.auth = null
    },
    LOGOUT(state, { payload }) {
      state.currentUser = null
    },
    LOGIN_RESTORED(state, { payload }) {
      state.currentUser = payload.id
      state.byId[payload.id] = payload
    }
  }
})

// we lose our context when trying to call localStorage.X
// inside these functions if we don't do this
const setItem = window.localStorage.setItem.bind(localStorage)
const removeItem = window.localStorage.removeItem.bind(localStorage)

function * onLoginAttempt({ payload }) {
  try {
    const { data } = yield call(
      API.post, '/auth/login', {
        email: payload.email,
        password: payload.password
      }
    )
    // assume login successful
    yield put(actions.LOGIN_SUCCESS(data))
  } catch (err) {
    yield put(actions.LOGIN_FAILED({ message: err.message }))
  }
}

function * onLoginSuccess({ payload }) {
  yield call(updateToken, payload.token)
  yield put(SHOW_MESSAGE({ status: 'success', title: 'Logged in' }))
  yield call(setItem, 'currentUser', JSON.stringify(payload))
}

function * onLoginFailed({ payload }) {
  yield put(SHOW_MESSAGE({ status: 'error', title: 'Login Failed', text: 'Check your email/password and try again' }))
}

function * onLogout({ payload }) {
  yield call(removeItem, 'currentUser')
}

function * onLoginRestored({ payload }) {
  yield call(updateToken, payload.token)
  try {
    yield call(API.get, '/auth/validateToken')
  } catch (err) {
    yield put(actions.LOGOUT())
  }
}

export function * saga() {
  yield takeLatest('LOGIN_ATTEMPT', onLoginAttempt)
  yield takeLatest('LOGIN_SUCCESS', onLoginSuccess)
  yield takeLatest('LOGIN_FAILED', onLoginFailed)
  yield takeLatest('LOGIN_RESTORED', onLoginRestored)
  yield takeLatest('LOGOUT', onLogout)
}

export const { LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, LOGIN_RESTORED } = actions

export default reducer
