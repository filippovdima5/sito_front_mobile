import React from 'react'
import { useStore } from 'effector-react'
import { Modal } from '../Search/Modal/animate/ModalAnimate'
import styles from './Search.module.scss'

import { modSearch } from './searchStore'

import { Icon } from './Icon/Icon'
import { Input } from './Input/Input'


function Search() {
  const $modSearch = useStore(modSearch)

  return (
    <div
      className={`${styles.Search} ${$modSearch ? styles.search_active : styles.search_close}`}
    >
      <Icon/>
      <Input/>
      <Modal/>
    </div>
  )
}

export { Search }