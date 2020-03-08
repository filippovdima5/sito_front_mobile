import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useTransitionNames } from '../../../../helpers/hooks/use-transition-names'

import { useStore, useEvent } from 'effector-react/ssr'
import { $showFilters, setShowFilters } from './store'

import { Header } from './atoms/header'
import { AllFilters } from './organisms/all-filters'
import { Filter } from './filter'

import styles from './styles.module.scss'
import animateStyles from './animate/filters-list.module.scss'

function FiltersList({ sexId }: {sexId: 1 | 2}) {
  const setShowFiltersEv = useEvent(setShowFilters)
  
  return (
    <div className={`${styles.wrap} ${styles.filtersList}`}>
      <Header title={'Фильтры'} event={() => setShowFiltersEv(false)} type={'close'}/>


      <div  className={styles.body}>
        <AllFilters sexId = {sexId}/>
      </div>


      <Filter sexId={sexId}/>
    </div>
  )
}

export function Filters({ sexId }: {sexId: 1 | 2}) {
  const showFilters = useStore($showFilters)
  const classNames = useTransitionNames(animateStyles)
  
  return (
    <TransitionGroup
      style = {{ position: 'absolute' }}
    >
      {showFilters &&
      <CSSTransition 
        timeout={300}
        classNames={classNames}
      >
        <FiltersList sexId = {sexId}/>
      </CSSTransition>
      }
    </TransitionGroup>
  )
}