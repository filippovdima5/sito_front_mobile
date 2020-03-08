import React from 'react'
import ReactDOM from 'react-dom'

import { loadableReady } from '@loadable/component'
import { fork, hydrate } from 'effector/fork';
import { rootDomain } from 'lib/effector';
import { BrowserRouter } from 'react-router-dom'

import { App } from './app'


hydrate(rootDomain, { values: (window as any).INITIAL_STATE });
const scope = fork(rootDomain);



Promise.all([
  loadableReady(),
])
  .then(
    () => {
      const root = document.getElementById('root')
      if (!root) return
  
      ReactDOM.hydrate(
        <BrowserRouter>
          <App root={scope}/>
        </BrowserRouter>
        , root)
    }
  )

