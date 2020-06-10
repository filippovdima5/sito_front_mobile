import React, { useMemo } from 'react'

import { useEvent, useStore } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import { $setModSearch, $modSearch } from '../store'
import { SearchIcon } from '../../../media/img/svg/icons'
import {  findSexIdInPathNotStrict } from '../../../lib'
import styles from './styles.module.scss'


export function Icon() {
  const setModSearch = useEvent($setModSearch)
  const modSearch = useStore($modSearch)
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])
  
  if (!sexId) return null
  
  return (
    <div
      onClick={() => setModSearch({ sex_id: sexId, mod: !modSearch })}
      className={styles.icon}
    >
      <SearchIcon  fill={'rgba(0, 0, 0, 1)'} className={styles.img}/>
    </div>
  )
}
