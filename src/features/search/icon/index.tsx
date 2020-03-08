import React from 'react'

import { useEvent } from 'effector-react/ssr'
import { setModSearch } from '../store'

import { SearchIcon } from '../../../media/img/svg/icons'

import styles from './styles.module.scss'


export function Icon() {
  const setModSearchEv = useEvent(setModSearch)
  
  return (
    <div
      onClick={() => setModSearchEv()}
      className={styles.icon}
    >
      <SearchIcon  fill={'rgba(0, 0, 0, 1)'} className={styles.img}/>
    </div>
  )
}
