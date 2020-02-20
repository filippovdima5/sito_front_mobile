import React from 'react'
import { useStore } from 'effector-react'
import styles from './styles.module.scss'
import { Header } from './atoms/header'
import { AllFilters } from './organisms/all-filters'
import { $showFilters, setShowFilters } from './store'
import { Filter } from './filter'



function FiltersList({ sexId }: {sexId: 1 | 2}) {
  return (
    <div className={`${styles.wrap} ${styles.filtersList}`}>
      <Header title={'Фильтры'} event={() => setShowFilters(false)} type={'close'}/>


      <div  className={styles.body}>
        <AllFilters sexId = {sexId}/>
      </div>


      <Filter sexId={sexId}/>
    </div>
  )
}

export function Filters({ sexId }: {sexId: 1 | 2}) {
  const showFilters = useStore($showFilters)
  if (showFilters) return <FiltersList sexId = {sexId}/>
  return null
}