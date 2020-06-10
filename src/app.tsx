import React  from 'react'
import { Scope } from 'effector/fork'
import { Provider } from 'effector-react/ssr'
import { AppTemplate } from './features/app-template'
import { ListenLocation } from './features/listen-location'
import { MetaTags } from './features/meta-tags'
import { useEffectSafe } from './hooks/use-effect-safe'
import { polyfills } from './polyfills'


export function App({ root }: { root: Scope }) {
  useEffectSafe(() => {
    polyfills()
  }, [])
  
  return(
    <Provider value={root}>
      <ListenLocation/>
      <MetaTags/>
      <AppTemplate/>
    </Provider>
  )
}



