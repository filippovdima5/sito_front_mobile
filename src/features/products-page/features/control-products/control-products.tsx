import React from 'react'

import { setShowFilters } from '../../../filters/store'
import { useEvent } from 'effector-react/ssr'

import { SetSort } from './set-sort'
import styles from './styles.module.scss'


export function ControlProducts(){
  const setShowFiltersEv = useEvent(setShowFilters)
  
  return (
    <div className={styles.controlProducts}>
      <div className={styles.wrap}>
        <SetSort/>

        <button
          onClick={() => setShowFiltersEv(true)}
          className={styles.btn}>Фильтры</button>
      </div>
    </div>
  )
}
