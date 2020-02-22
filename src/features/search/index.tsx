import React from 'react'
import { useStore } from 'effector-react'
import styles from './styles.module.scss'
import { $modSearch } from './store'
import { Icon } from './icon'
import { Input } from './input'
import  { SearchResult } from './modal'


export function Search() {
  const modSearch = useStore($modSearch)

  return (
    <div
      className={`${styles.Search} ${modSearch ? styles.search_active : styles.search_close}`}
    >
      <Icon/>
      <Input/>
      <SearchResult/>
    </div>
  )
}
