import React, { useMemo } from 'react'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import { $productsInfoStore, productsState, setProductsState } from '../store'
import styles from './styles.module.scss'



export function LoadMore() {
  const { total } = useStore($productsInfoStore)
  const { page } = useStore(productsState)
  
  const viewedProducts = useMemo(() => 20 * (page ? page : 1), [page])
  
  return(
    <div className={styles.loadMore}>
      <span className={styles.text}>
        {
          //TODO Написать хелпер, для изменения окончаний в славах (1-товар, 2 - товара, 5 - товаров)
          viewedProducts < total ?
            `Вы просмотрели ${viewedProducts} товаров из ${total}` :
            `Вы просмотрели все ${total} товаров по данным параметрам`
        }
      </span>


      {
        viewedProducts < total &&
          <button
            onClick = {() => {setProductsState({ key: 'page', value: page !== null ? page + 1 : 2 })}}
            className={styles.button}>
            Показать ещё
          </button>
      }
    </div>
  )
}