import React from 'react'

import { setProductsState } from '../../../store'
import { useEvent } from 'effector-react/ssr'

import styles from './styles.module.scss'


const data = [
  { title: 'По новизне', index: 'update_up' },
  { title: 'По цене', index: 'price_up' },
  { title: 'По размеру скидики', index: 'sale_up' }
] as const


function SetSort() {
  const setProductsStateEv = useEvent(setProductsState)
  
  return (
    <div className={styles.setSort}>
      <select
        onChange={(event => { setProductsStateEv({ key: 'sort', value: event.target.value as typeof data['0' | '1' | '2']['index'] }) })}
        aria-readonly={true}
        className={styles.select_main}>
        {data.map(({ index, title }) => (
          <option key={index} value={index}>{title}</option>
        ))}
      </select>
    </div>
  )
}

export { SetSort }
