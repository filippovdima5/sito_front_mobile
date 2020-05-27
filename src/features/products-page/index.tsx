import React, {  useRef } from 'react'
import { useHistory } from 'react-router'
import { useStore, useEvent } from 'effector-react/ssr'
import { useEffectSafe } from '../../hooks/use-effect-safe'

import { Filters } from '../filters'
import { $initRouteHistory, $toggleSex , $statusPageProducts } from './store'



import { ControlProducts } from './features/control-products'
import { ProductsList } from './products-list'
import { LoadMore } from './load-more'

import styles from './styles.module.scss'



type Props = {
  sexId: 1 | 2,
}

export function ProductsPage({ sexId }: Props) {
  const history = useHistory()
  const prevSexId = useRef<Props['sexId']>(sexId)
  
  const status = useStore($statusPageProducts)
  const toggleSex = useEvent($toggleSex)
  const initRouteHistory = useEvent($initRouteHistory)
  
  
  useEffectSafe(() => {
    if (sexId !== prevSexId.current ) toggleSex(sexId)
    prevSexId.current = sexId
  }, [ sexId ])
  
  
  useEffectSafe(() => {
    initRouteHistory(history)
  }, [])
  
  
  return (
    <>
      <div className={styles.products}>
        <ControlProducts/>
        <ProductsList/>
        {status === 'READY' &&   <LoadMore/>}
      </div>
      <Filters sexId = {sexId}/>
    </>
  )
}
