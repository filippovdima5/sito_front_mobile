import React from 'react'
import styles from './styles.module.scss'
import { Header } from './atoms/header'


function Filter({ sexId }: { sexId: 1 | 2 }) {
  return (
    <div className={`${styles.wrap} ${styles.filter}`}>
      <Header title={'Some filter'} event={() => console.log('d')} type={'back'}/>

      <div className={styles.body}>
        some filter {sexId}
      </div>

    </div>
  )
}


function ShowFilter({ sexId }: { sexId: 1 | 2 }) {
  return <Filter sexId={sexId}/>
}

export { ShowFilter as Filter }