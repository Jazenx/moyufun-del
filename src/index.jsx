/* eslint-disable react/button-has-type */
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'react-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import './style/index.styl'
import App from './views/app'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
