import React from 'react'
import { useEvent } from 'effector-react/ssr'
import styles from '../../media/css/info-page.module.scss'
import { Button1 } from '../../commons/atoms'
import { $skipAllFilters } from './store'


export function EmptyList() {
  const skipAllFilters = useEvent($skipAllFilters)
  
  return (
    <div className={styles.wrap}>
      <div>
        <div className={styles.container}>
          <div className={styles.title}>К сожалению, по вашему запросу ничего не найдено</div>
          <div className={styles.body}>
            <span>
              Попробуйте отменить несколько фильтров, чтобы посмотреть больше товаров
            </span>
          </div>
        
          <div className={styles.buttons}>
        
            <div onClick={() => skipAllFilters()} className={styles.link}>
              <Button1 className={styles.btn} onClick={() => skipAllFilters()}>
                Сбросить все фильтры
              </Button1>
            </div>
     
          </div>
        </div>
      </div>
    </div>
  )
}
