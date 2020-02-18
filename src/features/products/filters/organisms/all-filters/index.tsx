import React, { useMemo } from 'react'
import { useStore } from 'effector-react'
import { $filtersView, skipAllFilters, setShowFilter, setShowFilters } from '../../store'
import { setFilter, $productsInfoStore } from '../../../../../pages/products/store'
import { FilterRow, UnuseFilterRow } from '../../molecules/filter-row'
import { CheckRow } from '../../molecules/check-row'
import styles from './styles.module.scss'


function TitleTypeList({ count, title, allCount }: {count: number, title: string, allCount: number}) {
  if (count > 0 && count < allCount) return (
    <h3 className={styles.h3}>{title}</h3>
  )
  else return null
}


export function AllFilters({ sexId }: {sexId: 1 | 2}) {
  const filtersView = useStore($filtersView)
  const { total } = useStore($productsInfoStore)

  const [ usageFilters, unusedFilters ] = useMemo(() => [
    filtersView.filter(({ data }) => (!!data)),
    filtersView.filter(({ data }) => (!data)),
  ], [filtersView])

  return (
    <>
      <div>
        <div className={styles.filtersList}>
          
          <TitleTypeList count={usageFilters.length} title={'Используются сейчас'} allCount={usageFilters.length + unusedFilters.length}/>
          
          <div className={styles.filters}>
            
            {
              usageFilters.length > 1 &&
              <button className={styles.skipAll} onClick={() => skipAllFilters()}>Сбросить всё</button>
            }
            
            <div className={styles.list}>
              {usageFilters.map(({ name, type, data }) => {
                if (type !== 'bool') {
                  return (
                    <div onClick={() => setShowFilter(name)} key = {name} className={styles.itemList}>
                      <FilterRow
                        type={type}
                        title = {name}
                        sexId = {sexId}
                        // @ts-ignore
                        data={data}
                      />
                    </div>
                  )
                }
                return (
                  <div key={name}  className={styles.itemList}>
                    <CheckRow title={name} check={Boolean(data)} disabled={false} event={() => {setFilter({ key: 'favorite', value: !data })}}/>
                  </div>
                )
              })}
            </div>
          </div>
          
        </div>




        <div className={styles.filtersList}>

          <TitleTypeList count={unusedFilters.length} title={'Остальные'} allCount={usageFilters.length + unusedFilters.length}/>
          
          <div className={styles.filters}>

            <div className={styles.list}>
              {unusedFilters.map(({ name, type, data }) => {
                if (type !== 'bool') return (
                  <div onClick={() => setShowFilter(name)} key={name}  className={styles.itemList}>
                    <UnuseFilterRow key = {name} title={name}/>
                  </div>
                )
                return (
                  <div key={name}  className={styles.itemList}>
                    <CheckRow
                      key={name}
                      title={name}
                      disabled={false}
                      check={Boolean(data)}
                      event={() => {setFilter({ key: 'favorite', value: !data })}}/>
                  </div>
                )
              })}
            </div>

          </div>
          
        </div>

      </div>

      <div className={styles.space}/>

      {/*//todo Написать хелпер для склонений взависимости от кол - ва*/}
      <button onClick={() => setShowFilters(false)}>{`Посмотреть ${total} предложения`}</button>

    </>
  )
}
