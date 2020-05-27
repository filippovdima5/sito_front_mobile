import React, { useMemo } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import styles from './styles.module.scss'



export function LoadMore() {

  

  //     `Вы просмотрели ${viewedProducts} товаров из ${total}` :
  //             `Вы просмотрели все ${total} товаров по данным параметрам`

  
  return(
    <div className={styles.loadMore}>
      <span className={styles.text}>
     d
      </span>


      {/*<button*/}
      {/*  onClick = {() => {setProductsStateEv({ key: 'page', value: page !== null ? page + 1 : 2 })}}*/}
      {/*  className={styles.button}>*/}
      {/*  Показать ещё*/}
    </div>
  )
}
