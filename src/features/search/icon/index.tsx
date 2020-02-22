import React from 'react'
import { SearchIcon } from '../../../media/img/svg/icons'
import styles from './styles.module.scss'
import { setModSearch } from '../store'


export function Icon() {
  return (
    <div
      onClick={() => setModSearch()}
      className={styles.icon}
    >
      <SearchIcon fill={'rgba(0, 0, 0, 1)'} className={styles.img}/>
    </div>
  )
}
