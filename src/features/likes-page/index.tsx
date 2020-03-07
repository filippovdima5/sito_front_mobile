import React, { useEffect } from 'react'
import { loadLikeProducts, $statusPage } from './store'
import { useStore } from '../../helpers/hooks/use-effector-store'
import styles from './styles.module.scss'
import { ReadyPage } from './ready-page'
import { EmptyPage } from './empty-page'
import { StatusPage } from './store'


function Controller({ status }: {status: StatusPage}) {
  switch (status) {
    case 'EMPTY': return <EmptyPage/>
    default: return <ReadyPage/>
  }
}


export function LikesPage() {
  const statusPage = useStore($statusPage)
  useEffect(() => {loadLikeProducts()}, [])
  
  
  return(
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Controller status={statusPage}/>
      </div>
    </div>
  )
}
