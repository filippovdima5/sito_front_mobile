import React  from 'react'
import config from './config'

import { Scope } from 'effector/fork';
import { Provider } from 'effector-react/ssr';
import { useEffectSafe } from './helpers/hooks/use-effect-safe'
import { useLocation } from 'react-router'

import { useEvent } from 'effector-react/ssr'
import { $fetchUser } from './stores/user'
import { $setUrlInfo } from './stores/env'

import { Header } from './features/header'
import { Pages } from './pages'
import { Footer } from './features/footer'
import BackToTop from './commons/molecules/back-to-top'

import styles from './media/css/app.module.scss'
import './media/css/reset.module.scss'

interface Props {
  root: Scope;
}


function Main() {
  const { pathname, search } = useLocation()
  const fetchUser = useEvent($fetchUser)
  const setUrlInfo = useEvent($setUrlInfo)
  
  useEffectSafe(() => {
    if (config.local) {
      fetchUser()
    }
  }, [])
  
  useEffectSafe(() => {
    setUrlInfo({ path: pathname, search })
  }, [ pathname, search ])
  

  
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Header/>
      </header>
    
      <main className={styles.main}>
        <Pages/>
      </main>
    
      <footer className={styles.footer}>
        <Footer/>
      </footer>
    
      {!config.ssr && <BackToTop/>}
    </div>
  )
}



export function App({ root }: Props) {
    return(
      <Provider value={root}>
        <Main/>
      </Provider>
    )
}



