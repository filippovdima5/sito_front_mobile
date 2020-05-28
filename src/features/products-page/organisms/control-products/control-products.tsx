import React from 'react'
import styles from './styles.module.scss'


export function ControlProducts({ unShow }: { unShow?: boolean }){
  
  return (
    <div className={`${styles.base} ${unShow ? styles.unShow : styles.show}`}>
      <div className={styles.wrap}>
        <button className={styles.btn}>Сортировать</button>
        <button className={styles.btn}>Фильтры</button>
      </div>
    </div>
  )
}
