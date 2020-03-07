import React from 'react'
import styles from './media/css/app.module.scss'
import './media/css/reset.module.scss'
import { Header } from './features/header'
import { Pages } from './pages'
import { Footer } from './features/footer'
import BackToTop from './commons/molecules/back-to-top'
import config from './config'


export function App() {
    return(
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

export default App



