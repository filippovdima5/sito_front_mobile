import React from 'react'
import { useStore } from 'effector-react'
import { $filtersStore  } from '../../../pages/products/store'
import styles from './styles.module.scss'
import { Header } from './atoms/header'
import { $showFilter, setShowFilter, $filtersViewRecord } from './store'
import { filtersMap } from './types'
import { ListFilter } from './organisms/list-filter'


function FilterBody({ name, sexId }: {name: keyof typeof filtersMap, sexId: 1 | 2 }) {
  const filtersSate = useStore($filtersViewRecord)
  const filterStore = useStore($filtersStore)
  if (filterStore === null) return null

  switch (name) {
    case 'brands':
    case 'categories':
    case 'colors':
    case 'sizes': return (
      <ListFilter storeData = { filterStore[name] }  stateData = { filtersSate[name] } filter = { name } sexId = {sexId} />
    )
    default: return null
  }
}


function Filter({ sexId, name }: { sexId: 1 | 2, name: keyof typeof filtersMap}) {
  return (
    <div className={`${styles.wrap} ${styles.filter}`}>
      <Header title={filtersMap[name]} event={() => setShowFilter(null)} type={'back'}/>
      <div className={styles.body}>
        <FilterBody sexId={sexId} name={name}/>
      </div>
    </div>
  )
}


function ShowFilter({ sexId }: { sexId: 1 | 2 }) {
  const showFilter = useStore($showFilter)
  if (showFilter !== null) return <Filter name = {showFilter} sexId={sexId}/>
  else return null
}


export { ShowFilter as Filter }