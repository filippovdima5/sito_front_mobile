import React from 'react'
import { useStore } from 'effector-react/ssr'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Animate } from '../../../wrappers/animate'
import styles from '../styles/filter.module.scss'
import { $showFilter } from '../store'
import { FiltersWrap  } from '../templates'
import { OneFilterHeader } from '../atoms/one-filter-header'
import { CategoriesFilter } from './categories'


const HTML_ID = 'filter-wrap'

export function Filter() {
  const showFilter = useStore($showFilter)
  
  
  return (
    <Animate
      onEntered={() => disableBodyScroll(document.getElementById(HTML_ID) as HTMLElement)}
      flag={Boolean(showFilter)}
      styles={styles}
    >
      <FiltersWrap 
        idElement={HTML_ID}
        header={(<OneFilterHeader title={showFilter?.title}/>)}
      >
        <CategoriesFilter/>
      </FiltersWrap>
    </Animate>
  )
}
