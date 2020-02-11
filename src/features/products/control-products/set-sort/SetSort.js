import React from 'react'
import styles from './SetSort.module.scss'


function SetSort() {
  return (
    <div className={styles.SetSort}>
      <select
        aria-readonly={true}
        className={styles.select_main}>
        <option value={'update_up'}>По новизне</option>
        <option value={'price_up'}>По цене</option>
        <option value={'sale_up'} >По размеру скидики</option>
      </select>
    </div>
  )
}

export { SetSort }