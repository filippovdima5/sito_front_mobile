import React  from 'react'
import { Menu } from '../menu'
import { NextMenu } from '../menu/organisms/next-menu'
import { Search } from '../search'
import { Logo } from '../../commons/atoms'
import styles from './styles.module.scss'


export function Header() {
  return (
    <div className={styles.Header}>
      <Menu/>
      <NextMenu/>

      <div className={`${styles.logo} ${styles.header_item}`}>
        <Logo/>
      </div>

      <Search/>
    </div>
  )
}

