import React from 'react'
import { useStore } from 'effector-react/ssr'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Animate } from '../../wrappers/animate'
import { useEffectSafe } from '../../hooks/use-effect-safe'
import { FiltersWrap } from './templates'
import styles from './styles/filters-wrap.module.scss'
import { $showFilters } from './store'
import { AllFiltersHeader } from './atoms/all-filters-header'
import { AllFilters, Filter } from './organisms'


export function Filters() {
  const showFilters = useStore($showFilters)
  useEffectSafe(() => {
    if (!showFilters) enableBodyScroll(document.getElementById('all-filters') as HTMLElement)
  }, [showFilters])
  
  
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
          header={<AllFiltersHeader />}
        >
          <AllFilters/>
        </FiltersWrap>
        
        
        <Filter/>
      </>
    </Animate>
  ) 
}



