import React from 'react'
import { setShowFilters } from '../filters/store'
import { SetSort } from './set-sort'
import styles from './styles.module.scss'


export function ControlProducts(){
  return (
    <div className={styles.controlProducts}>
      <div className={styles.wrap}>
        <SetSort/>

        <button
          onClick={() => setShowFilters(true)}
          className={styles.btn}>Фильтры</button>
      </div>
    </div>
  )
}