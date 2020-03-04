import React, {useCallback, useEffect, useRef} from 'react'
import { createEvent, createStore } from 'effector'
import { useStore } from '../../../../helpers/hooks/use-effector-store'
import {  $currentRoute } from '../../../../stores/env'
import styles from './styles.module.scss'
import { ButtonSex } from '../../atoms/button-sex'
import {Link} from 'react-router-dom'
import {sexIdToStr} from '../../../../helpers/lib'



type HeaderProps = {
  sexId: 1 | 2 | 0,
}

const signalWithoutSexId = createStore<boolean | number>(false)
export const setSignalWithoutSexId = createEvent()
const setOrder = createEvent<number>()
signalWithoutSexId.on(setSignalWithoutSexId, state => !state)
signalWithoutSexId.on(setOrder, (state, payload) => payload)





export function Header ({ sexId }: HeaderProps) {
  const timerSignal = useRef<any>(null)
  const currentRoute = useStore($currentRoute)
  
  const signal = useStore(signalWithoutSexId)
  useEffect(() => {
    if (signal) {
      switch (signal) {
        case 1:
          timerSignal.current = setTimeout(() => { setOrder(2) }, 300); break
        case 2:
          timerSignal.current = setTimeout(() => { setSignalWithoutSexId() }, 300); break
        default:
          timerSignal.current = setTimeout(() => { setOrder(1) }, 100); break
      }
    }
    // @ts-ignore
    return () => clearTimeout(timerSignal.current as NonNullable<any>)
  }, [signal])


  const sexLink = useCallback((sexItem: 1 | 2): string => {
    switch (currentRoute) {
      case '/home/':
      case '/404/': return `/home/${sexIdToStr(sexItem)}`
      default: return `${currentRoute}${sexIdToStr(sexItem)}`
    }
  }, [currentRoute])
  
  
  // todo: Сделать линки на страницах, где есть /men or /women, в других местах оставить дивы
  return (
    <div className={styles.Header}>
      <div className={styles.border}/>
      {([1, 2] as [1, 2]).map(item => (
        <Link to={sexLink(item)} className={styles.buttonWrap}>
          <ButtonSex sexId={item} signal={signal} currentSex={sexId}/>
        </Link>
      ))}
    </div>
  )
}

