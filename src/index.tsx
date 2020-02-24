import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'
import { loadableReady } from '@loadable/component'


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

