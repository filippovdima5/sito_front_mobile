import React, { useState } from 'react'
import { setSearchPhrase } from '../../store'
import styles from './Search.module.scss'


function Search() {

  const [value, setValue] = useState('Поиск')
  const handleSetValue = (e) => {
    setValue(e.currentTarget.value)
    setSearchPhrase(e.currentTarget.value)
  }


  return (
    <div className={styles.Search}>
      <div className={styles.inputWrap}>
        <input
          onFocus = { () => setValue('') }
          onChange = { handleSetValue }
          value = { value }
          placeholder={'Поиск'}
          type={'text'}
          className={styles.input}
        />
      </div>
    </div>
  )
}

export { Search }