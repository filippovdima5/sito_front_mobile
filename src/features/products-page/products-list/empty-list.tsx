import React from 'react'
import styles from '../../../media/css/info-page.module.scss'


export function EmptyList() {
  
  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.container}>
          <div className={styles.img}/>
          <div className={styles.title}>К сожалению, по вашему запросу ничего не найдено</div>
          <div className={styles.body}>
            <span>
              Попробуйте отменить несколько фильтров, чтобы посмотреть больше товаров
            </span>
          </div>
        
          <div className={styles.buttons}>
        
            {/*<div onClick={() => skipAllFiltersEv()} className={styles.link}>*/}
            {/*  <Button onClick={() => skipAllFilters()} title={'Сбросить все фильтры'}/>*/}
            {/*</div>*/}
     
          </div>
        </div>
      </div>
    </div>
  )
}
