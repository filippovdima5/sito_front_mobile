import React  from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '../menu'
import { NextMenu } from '../menu/organisms/next-menu'
import { Search } from '../search'
import styles from './styles.module.scss'
import {Logo} from '../../commons/atoms'


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

