/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import rootReducer from '../reducers'

const composeEnhancers = ((<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
