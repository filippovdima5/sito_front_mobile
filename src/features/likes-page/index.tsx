import React from 'react'
import { useEffectSafe } from '../../helpers/hooks/use-effect-safe'

import { useStore, useEvent } from 'effector-react/ssr'
import { loadLikeProducts, $statusPage } from './store'
import { StatusPage, $loadingLikes } from './store'

import { ReadyPage } from './ready-page'
import { EmptyPage } from './empty-page'
import { Loader } from '../../commons/templates/loader'

import styles from './styles.module.scss'


function Controller({ status }: {status: StatusPage}) {
  switch (status) {
    case 'EMPTY': return <EmptyPage/>
    default: return <ReadyPage/>
  }
}


export function LikesPage() {
  const loadLikeProductsEv = useEvent(loadLikeProducts)
  const statusPage = useStore($statusPage)
  useEffectSafe(() => {loadLikeProductsEv()}, [])
  const loader = useStore($loadingLikes)
  
  return(
    <div className={styles.wrap}>
      {loader && <Loader/>}
      <div className={styles.container}>
        <Controller status={statusPage}/>
      </div>
    </div>
  )
}
