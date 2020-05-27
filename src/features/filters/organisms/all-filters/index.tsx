import React, { useMemo } from 'react'

import { useStore, useEvent } from 'effector-react/ssr'



import { FilterRow, UnuseFilterRow } from '../../molecules/filter-row'
import { CheckRow } from '../../molecules/check-row'
import { BtnDone } from '../../atoms/btn-done'

import styles from './styles.module.scss'


function TitleTypeList({ count, title, allCount }: {count: number, title: string, allCount: number}) {
  if (count > 0 && count < allCount) return (
    <h3 className={styles.h3}>{title}</h3>
  )
  else return null
}


export function AllFilters({ sexId }: {sexId: 1 | 2}) {
  return (
    <div>
      ALLFILTERS
    </div>
  )
}
