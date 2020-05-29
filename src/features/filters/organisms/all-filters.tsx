import React, { useMemo, FC } from 'react'
import { useStore } from 'effector-react/ssr'
import { $viewFiltersList } from '../../products-page/store'
import { FilterRow } from '../molecules/filter-row'
import { ViewFilterItem } from '../../products-page/lib'
import styles from './all-filters.module.scss'


function TitleTypeList({ count, title }: {count: number, title: string}) {
  const viewFilters = useStore($viewFiltersList)
  const allCount = useMemo(() => viewFilters.length, [viewFilters])
  if (count > 0 && count < allCount) return (
    <h3 className={styles.h3}>{title}</h3>
  )
  else return null
}


const WrapFiltersList: FC<{ filters: Array<ViewFilterItem> }> = (props) => (
  <div className={styles.filtersList}>
    { props.children }
    
    <div className={styles.filters}>
      <div className={styles.list}>
        {props.filters.map((props, i) => (
          <div key = {props.index} className={styles.itemList}>
            <FilterRow isFirst={Boolean(props.label) && i === 0} {...props}/>
          </div>
        ))}
      </div>
    </div>
  </div>
)


export function AllFilters() {
  const viewFilters = useStore($viewFiltersList)
  
  const usedFilters = useMemo(() => viewFilters.filter(i => Boolean(i.label)), [viewFilters])
  const unUsedFilters = useMemo(() => viewFilters.filter(i => !i.label), [viewFilters])
  
  return (
    <div>
      <WrapFiltersList filters={usedFilters}>
        <TitleTypeList count={usedFilters.length} title={'Используются сейчас'}/>
        {usedFilters.length > 1 && (
          <button className={styles.skipAll}>Сбросить всё</button>
        )}
      </WrapFiltersList>

      
      <WrapFiltersList filters={unUsedFilters}>
        <TitleTypeList count={unUsedFilters.length} title={'Остальные'}/>
      </WrapFiltersList>
    </div>
  )
}

