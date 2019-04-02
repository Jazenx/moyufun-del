import { combineReducers, createReducer } from 'redux-immutablejs'

const demo = createReducer({
  language: '123',
  userType: '123'
}, {
  DEMO1: (state, { payload }) => {
    sessionStorage.setItem('language', payload.language)
    return state.set('language', payload.language)
  }
})

export default combineReducers({ demo })
