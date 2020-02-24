import { createStore, applyMiddleware, compose } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk'

import config from 'config'
import { rootReducer } from './reducers'


type ComposeFn = typeof compose

export default function configureStore(initialState?: any) {
  const composeEnhancers = !config.ssr
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as ComposeFn || compose // eslint-disable-line no-underscore-dangle
    : compose
  
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<any>)),
  )
}