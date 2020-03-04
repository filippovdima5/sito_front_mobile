import React from 'react'
import styles from './styles.module.scss'
import { ControlProducts } from './control-products'
import { ProductsList } from './products-list'
import { LoadMore } from './load-more'
import { Filters } from './filters'
import {useEffectSafe} from '../../helpers/hooks/use-effect-safe'
import {initRouteHistory} from './store'
import { useHistory } from 'react-router'


type Props = {
  sexId: 1 | 2
}

export function ProductsPage({ sexId }: Props) {
  const history = useHistory()
  useEffectSafe(() => {
    initRouteHistory(history)
  }, [])
  
  return (
    <>
      <div className={styles.products}>
        <ControlProducts/>
        <ProductsList/>
        <LoadMore/>
      </div>
      <Filters sexId = {sexId}/>
    </>
  )
}