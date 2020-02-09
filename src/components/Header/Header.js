import React  from 'react'
import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import { Menu } from './Menu/Menu'
import { Search } from './Search/Search'


function Header() {


  return (
    <div className={styles.Header}>
      <Menu/>

      <Link to = {'/'} className={`${styles.logo} ${styles.header_item}`}>
        <span className={styles.a}>
          <span className={styles.text}>Sito</span>
        </span>
      </Link>

      <Search/>
    </div>
  )
}

export { Header }