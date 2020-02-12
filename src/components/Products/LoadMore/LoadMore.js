import React, { useState, useEffect } from 'react'
import { useStore } from 'effector-react'
import { ButtonMore } from '../_bank/Button/ButtonMore'
import styles from './LoadMore.module.scss'



function LoadMore() {
  const [viewed, setViewed] = useState(0)

  //useEffect(() => {setViewed(countOnList * (page ? page : 1))}, [total, countOnList, page])
    
  return (
    <div className={styles.LoadMore}>
      <span className={styles.text}>
        {
          // TODO Написать хелпер, для изменения окончаний в славах (1-товар, 2 - товара, 5 - товаров)
          // viewed < total ?
          //   `Вы просмотрели ${viewed} товаров из ${total}` :
          //   `Вы просмотрели все ${total} товаров по данным параметрам`
        }
      </span>


      {
        viewed < total ?
          <ButtonMore
            onClick={() => (setPage())}
            title={'Показать ещё'}
          />
          :
          <ButtonMore
            onClick={() => (document.body.scrollTo(0,0))}
            title={'Наверх'}
          />
      }
    </div>
  )
}

export { LoadMore }