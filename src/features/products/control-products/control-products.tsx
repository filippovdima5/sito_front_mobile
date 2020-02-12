import React from 'react'
import { SetSort } from './set-sort'
import styles from './styles.module.scss'



export function ControlProducts(){
  return (
    <div className={styles.controlProducts}>
      <div className={styles.wrap}>
        <SetSort/>
        <button className={styles.btn}>Фильтры</button>
      </div>
    </div>
  )
}