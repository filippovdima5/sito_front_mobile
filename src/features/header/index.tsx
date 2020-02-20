import React  from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '../menu'
import { Search } from '../search/Search'
import styles from './styles.module.scss'


export function Header() {
  return (
    <div className={styles.Header}>
      {/*<Menu/>*/}

      <Link to = {'/'} className={`${styles.logo} ${styles.header_item}`}>
        <span className={styles.a}>
          <span className={styles.text}>Sito</span>
        </span>
      </Link>

      <Search/>
    </div>
  )
}

