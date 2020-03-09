import React, {  useRef } from 'react'
import {useEffectSafe} from '../../helpers/hooks/use-effect-safe'
import { useHistory } from 'react-router'

import { useStore, useEvent } from 'effector-react/ssr'
import { $initRouteHistory, $mountProductsPageLocal, $toggleSex } from './store'
import {loadLikes, setGender} from '../../stores/env2'
import { $statusPageProducts } from './store'


import { ControlProducts } from './features/control-products'
import { ProductsList } from './products-list'
import { LoadMore } from './load-more'
import { Filters } from './features/filters'

import styles from './styles.module.scss'
import config from '../../config'


type Props = {
  sexId: 1 | 2
}

export function ProductsPage({ sexId }: Props) {
  const history = useHistory()
  const prevSexId = useRef<Props['sexId']>(sexId)
  
  const status = useStore($statusPageProducts)
  const mountProductsPageLocal = useEvent($mountProductsPageLocal)
  const toggleSex = useEvent($toggleSex)
  const initRouteHistory = useEvent($initRouteHistory)
  
  const loadLikesEv = useEvent(loadLikes)
  

  // useEffectSafe(() => {
  //   if (sexId !== prevSexId.current ) toggleSex()
  //   prevSexId.current = sexId
  // }, [sexId])
  
  
  useEffectSafe(() => {
    if (!config.ssr) initRouteHistory(history)
    loadLikesEv()
  }, [])
  
  
  useEffectSafe(() => {
    if (config.local) {
      mountProductsPageLocal({ search: history.location.search.replace('?', '') })
    }
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