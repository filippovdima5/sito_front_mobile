import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import { setPhrase, $modSearch } from '../store'
import styles from './styles.module.scss'


export function Input() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const modSearch = useStore($modSearch)



  useEffect(() => {
    if (modSearch) (inputRef.current as HTMLInputElement).focus()
    else (inputRef.current as HTMLInputElement).blur()
  }, [ modSearch ])

  const [value, setValue] = useState<string>('')

  const handleChange = useCallback((event: any) => {
    const phrase = event.currentTarget.value
    setValue(phrase)
    setPhrase(phrase)
  }, [])


  return (
    <input
      value = { value }
      onChange = { handleChange }
      ref = { inputRef }
      placeholder={ 'Поиск по ключевому слову' }
      className={ styles.Input }
      type={ 'text' }
    />
  )
}

