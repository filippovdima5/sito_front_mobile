import React, { useState } from 'react'
import { SetSort } from '../../atoms'
import { Arrow } from '../../../../assets/svg'
import styles from './styles.module.scss'


export function ControlProducts({ unShow }: { unShow?: boolean }){
  const [ showSort, setShowSort ] = useState(false)
  
  return (
    <div className={`${styles.base} ${unShow ? styles.unShow : styles.show}`}>
      <div className={styles.wrap}>
        
        <button
          onClick={() => setShowSort(!showSort)}
          className={styles.btn}
        >
          Сортировать
          <Arrow rotate={showSort ? 180 : 0} className={styles.arrowSvg}/>
        </button>
        
        
        
        
        <button className={styles.btn}>Фильтры</button>
      </div>
      
      <SetSort showSort={showSort} setShowSort={setShowSort}/>
      
    </div>
  )
}
