import React from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Animate } from '../../wrappers/animate'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { FiltersWrap } from './templates'
import styles from './styles/filters-wrap.module.scss'
import { $showFilters , $setShowFilters, $setShowFilter } from './store'
import { Filter } from './organisms'


export function Filters() {
  const showFilters = useStore($showFilters)
  useEffectSafe(() => {
    if (!showFilters) enableBodyScroll(document.getElementById('all-filters') as HTMLElement)
  }, [showFilters])
  
  
  const setShowFilters = useEvent($setShowFilters)
  const setShowFilter = useEvent($setShowFilter)
  
  return (
    <Animate
      onEntered={() => disableBodyScroll(document.getElementById('all-filters') as HTMLElement)}
      flag={showFilters}
      styles={styles}
      wrapStyles={{ position: 'absolute' }}
    >
      <>
        <FiltersWrap
          idElement={'all-filters'}
          isWrap={true}
          header={<div>HEADER</div>}
        >
          BODY
          <div onClick={() => setShowFilters(false)}>edddddddddddddf</div>
          BODY
          
          <br/>
          <div onClick={() => setShowFilter(true)}>OPEN FILTER</div>
        </FiltersWrap>
        
        
        <Filter/>
      </>
    </Animate>
  ) 
}



