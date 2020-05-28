import React from 'react'
import { useEvent, useStore } from 'effector-react/ssr'
import { Animate } from '../../../wrappers/animate'
import styles from '../styles/filter.module.scss'
import { $showFilter, $setShowFilter } from '../store'
import { FiltersWrap } from '../templates'


export function Filter() {
  const showFilter = useStore($showFilter)
  const setShowFilter = useEvent($setShowFilter)
  
  return (
    <Animate 
      flag={showFilter}
      styles={styles}
    >
      <FiltersWrap 
        idElement={'filter-wrap'}
        header={<div>FILTER-HEADER</div>}
      >
        FILTER BODY!!!
        <br/>
        <div onClick={() => setShowFilter(false)}>close</div>
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'red' }}
        />
        
      </FiltersWrap>
    </Animate>
  )
}
