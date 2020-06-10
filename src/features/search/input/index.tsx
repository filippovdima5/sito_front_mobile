import React, { useCallback, useRef, useState, useMemo } from 'react'
import { useStore, useEvent } from 'effector-react/ssr'
import { useLocation } from 'react-router'
import { useEffectSafe } from '../../../hooks/use-effect-safe'
import { $modSearch, $setSearch } from '../store'
import { findSexIdInPathNotStrict } from '../../../lib'
import styles from './styles.module.scss'


export function Input() {
  const inputRef = useRef<HTMLInputElement>(null)
  const modSearch = useStore($modSearch)
  const setSearch = useEvent($setSearch)
  
  const { pathname } = useLocation()
  const sexId = useMemo(() => findSexIdInPathNotStrict(pathname), [pathname])
  
  const [value, setValue] = useState<string>('')
  useEffectSafe(() => {setValue('')}, [sexId])
  
  
  const handleChange = useCallback((event: any) => {
    const phrase = event.currentTarget.value
    setValue(phrase)
    setSearch({ phrase, sex_id: sexId })
  }, [setSearch, sexId])
  
  if (!sexId) return null
  
  return (
    <input
      value = {modSearch ? value : 'Поиск по ключевому слову'}
      onChange = { handleChange }
      ref = { inputRef }
      placeholder={ 'Поиск по ключевому слову' }
      className={ styles.Input }
      type={ 'text' }
    />
  )
}

