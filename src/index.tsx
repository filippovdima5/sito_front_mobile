import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import { loadableReady } from '@loadable/component'
import { hydrateInitialState } from './ssr/utils/hydrate-initial-state'


const serverPreloadedState = (window as any).__PRELOADED_STATE__
const preloadedState = Object.assign({}, serverPreloadedState)
hydrateInitialState(preloadedState)


Promise.all([
  loadableReady(),
])
  .then(
    () => {
      const root = document.getElementById('root')
      if (!root) return
  
      ReactDOM.hydrate(
        <BrowserRouter>
          <App/>
        </BrowserRouter>
        , root)
    }
  )

