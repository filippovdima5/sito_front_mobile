import React from 'react'
import { useStore } from '../../../helpers/hooks/use-effector-store'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useTransitionNames } from '../../../helpers/hooks/use-transition-names'
import styles from './styles.module.scss'
import animateStyles from './animate/filters-list.module.scss'
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