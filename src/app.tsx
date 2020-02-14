import React from 'react'
import styles from './media/css/app.module.scss'
import './media/css/reset.module.scss'
import { Header } from './components/Header/Header'
import { Pages } from './pages'
import { Footer } from './components/Footer/Footer'
import { Menu } from './components/Menu/animate/MenuAnimate'





const App = React.memo(function App() {
  return (
    <div id={'app'} className={styles.App}>
      <Menu/>

      <header className={styles.header}>
        <Header/>
      </header>

      <main className={styles.main}>
        <Pages/>
      </main>

      <footer className={styles.footer}>
        <Footer/>
      </footer>
    </div>
  )
})

export { App }