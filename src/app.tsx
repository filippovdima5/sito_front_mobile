import React from 'react'
import config from './config'

import { Scope } from 'effector/fork';
import { Provider } from 'effector-react/ssr';

import { Header } from './features/header'
import { Pages } from './pages'
import { Footer } from './features/footer'
import BackToTop from './commons/molecules/back-to-top'

import styles from './media/css/app.module.scss'
import './media/css/reset.module.scss'


interface Props {
  root: Scope;
}


export function App({ root }: Props) {
    return(
      <Provider value={root}>
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
      </Provider>
    )
}

export default App



