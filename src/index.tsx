import React from 'react'
import ReactDOM from 'react-dom'

import { loadableReady } from '@loadable/component'
import { fork, hydrate } from 'effector/fork';
import { rootDomain } from 'lib/effector';
import { BrowserRouter } from 'react-router-dom'
import { App } from './app'




Promise.all([
  loadableReady(),
  hydrate(rootDomain, { values: (window as any).INITIAL_STATE })
])
  .then(
    () => {
      const root = document.getElementById('root')
      if (!root) return
      let scope = fork(rootDomain);
      
      ReactDOM.hydrate(
        <BrowserRouter>
          <App root={scope}/>
        </BrowserRouter>
        , root)
    }
  )

