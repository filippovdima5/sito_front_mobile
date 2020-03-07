import React, { useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { ControlProducts } from './features/control-products'
import { ProductsList } from './products-list'
import { LoadMore } from './load-more'
import { Filters } from './features/filters'
import {useEffectSafe} from '../../helpers/hooks/use-effect-safe'
import {initRouteHistory, toggleSex} from './store'
import { useHistory } from 'react-router'
import { loadLikes } from '../../stores/env'


type Props = {
  sexId: 1 | 2
}

export function ProductsPage({ sexId }: Props) {
  const history = useHistory()
  useEffectSafe(() => {
    initRouteHistory(history)
    loadLikes()
  }, [])
  
  const prevSexId = useRef<Props['sexId']>(sexId)
  useEffect(() => {
    if (sexId !== prevSexId.current ) toggleSex(sexId)
    prevSexId.current = sexId
  }, [sexId])
  
  
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