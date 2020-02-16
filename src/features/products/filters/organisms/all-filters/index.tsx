import React from 'react'
import { useStore } from 'effector-react'
import { $filtersView } from '../../store'
import { FilterRow, UnuseFilterRow } from '../../molecules/filter-row'
import { CheckRow } from '../../molecules/check-row'
import styles from './styles.module.scss'



export function AllFilters({ sexId }: {sexId: 1 | 2}) {
  const filtersView = useStore($filtersView)



  return (
    <>
      <div>

        <div className={styles.filtersList}>
          
          <h3 className={styles.h3}>Используются сейчас</h3>
          
          <div className={styles.filters}>
            
            <button className={styles.skipAll}>Сбросить всё</button>
            
            <div className={styles.list}>
              {filtersView.filter(({ data }) => (!!data)).map(({ name, type, data }) => {
                if (type !== 'bool') {
                  return (
                    <div key = {name} className={styles.itemList}>
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
                    <CheckRow title={name} check={Boolean(data)} event={() => {console.log('f')}}/>
                  </div>
                )
              })}
            </div>
          </div>
          
        </div>




        <div className={styles.filtersList}>
          
          <h3 className={styles.h3}>Остальные</h3>
          
          <div className={styles.filters}>

            <div className={styles.list}>
              {filtersView.filter(({ data }) => (!data)).map(({ name, type, data }) => {
                if (type !== 'bool') return (
                  <div key={name}  className={styles.itemList}>
                    <UnuseFilterRow key = {name} title={name}/>
                  </div>
                )
                return (
                  <div key={name}  className={styles.itemList}>
                    <CheckRow key={name} title={name} check={Boolean(data)} event={() => {console.log('f')}}/>
                  </div>
                )
              })}
            </div>

          </div>
          
        </div>

      </div>

      <div className={styles.space}/>

    </>
  )
}
