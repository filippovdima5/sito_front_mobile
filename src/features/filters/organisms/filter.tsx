import React from 'react'
import { useStore } from 'effector-react/ssr'
import { disableBodyScroll } from 'body-scroll-lock'
import { Animate } from '../../../wrappers/animate'
import styles from '../styles/filter.module.scss'
import { $showFilter } from '../store'
import { FiltersWrap  } from '../templates'
import { OneFilterHeader } from '../atoms/one-filter-header'
import { $allFields } from '../../products-page/store'
import { ButtonDone } from '../molecules'
import { CategoriesFilter } from './categories'
import { BrandsFilter } from './brands'
import { SizesFilter } from './sizes'
import { RangeFilter } from './range-filter'


const HTML_ID = 'filter-wrap'


function FilterContent({ index }: { index?: string }) {
  const { sale_from, sale_to, price_from, price_to } = useStore($allFields)
  
  switch (index) {
    case 'categories': return (<CategoriesFilter/>)
    case 'brands': return (<BrandsFilter/>)
    case 'sizes': return (<SizesFilter/>)
    case 'sale': return (<RangeFilter range_key={['sale_from', 'sale_to']} value={[ sale_from, sale_to ]}/>)
    case 'price': return (<RangeFilter range_key={['price_from', 'price_to']} value={[price_from, price_to]}/>)
    
    default: return null
  }
}

export function Filter() {
  const showFilter = useStore($showFilter)
  
  
  return (
    <Animate
      onEntered={() => disableBodyScroll(document.getElementById(HTML_ID) as HTMLElement)}
      flag={Boolean(showFilter)}
      styles={styles}
    >
      <FiltersWrap idElement={HTML_ID} header={(<OneFilterHeader title={showFilter?.title} index={showFilter?.index}/>)}>
        <FilterContent index={showFilter?.index}/>
        
        <ButtonDone/>
      </FiltersWrap>
    </Animate>
  )
}


