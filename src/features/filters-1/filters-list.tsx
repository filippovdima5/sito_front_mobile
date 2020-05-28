import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useStore  } from 'effector-react/ssr'
import { useTransitionNames } from '../../hooks/use-transition-names'
import { AllFilters } from './organisms/all-filters'
import { Filter } from './filter'

import styles from './styles.module.scss'
import animateStyles from './animate/filters-list.module.scss'


function FiltersList({ sexId }: {sexId: 1 | 2}) {

  
  return (
    <div className={`${styles.wrap} ${styles.filtersList}`}>
      {/*<Header title={'Фильтры'} event={() => setShowFiltersEv(false)} type={'close'}/>*/}


      <div  className={styles.body}>
        <AllFilters sexId = {sexId}/>
      </div>


      <Filter sexId={sexId}/>
    </div>
  )
}

export function Filters({ sexId }: {sexId: 1 | 2}) {
  const showFilters = false
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
