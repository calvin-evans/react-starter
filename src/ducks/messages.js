import { createSlice } from '@reduxjs/toolkit'

const { actions, reducer } = createSlice({
  name: 'messages',
  initialState: {
    byId: {}
  },
  reducers: {
    SHOW_MESSAGE(state, { payload }) {
      const id = Date.now()
      state.byId[id] = { ...payload, id }
    },
    REMOVE_MESSAGE(state, { payload }) {
      delete state.byId[payload.id]
    }
  }
})

export const { SHOW_MESSAGE, REMOVE_MESSAGE } = actions

export default reducer
