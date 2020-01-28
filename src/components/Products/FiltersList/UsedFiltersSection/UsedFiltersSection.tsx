import React from 'react'
import { clearAllActiveFilters } from '../store'
import styles from './UsedFiltersSection.module.scss'
import { FilterRow } from './FilterRow/FilterRow'



// todo: Типизация
type Props = {
  used: boolean,
  filters: Array<{index: string, type: string, title: string, value: any}>,
}





function UsedFiltersSection({ used, filters }: Props) {

  return (
    <section className={styles.UsedFiltersSection}>

      {filters.length > 0 && filters.length < 6 && <h3 className={styles.h3}>{used ? 'Используются сейчас' : 'Остальные'}</h3>}

      <div className={styles.filters}>
        {used && filters.length > 1 &&
        <button
          onClick = {() => clearAllActiveFilters()}
          className={styles.skip_all}>
          Сбросить всё
        </button>
        }


        <div className={styles.list}>
          {filters.map(({ index, type, title,  }) => (
            <FilterRow
              index = { index }
              key = { index }
              title = { title }
              type = { type }
              isUsed = { used }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { UsedFiltersSection }