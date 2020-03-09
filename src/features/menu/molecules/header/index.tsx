import React, { useEffect, useRef } from 'react'
import {sexIdToStr} from '../../../../helpers/lib'

import { useStore, useEvent } from 'effector-react/ssr'
import { createEvent, createStore } from 'lib/effector'
import { $setGender } from '../../../../stores/user'
import { $baseLink } from '../../../../stores/env'

import { ButtonSex } from '../../atoms/button-sex'
import {Link} from 'react-router-dom'

import styles from './styles.module.scss'




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
  const { linkParams: { baseRoute } } = useStore($baseLink)
  const setGender = useEvent($setGender)
  
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



  return (
    <div className={styles.Header}>
      <div className={styles.border}/>
      {([1, 2] as [1, 2]).map(item => (
        <Link
          to={`/${baseRoute}/${sexIdToStr(item)}`}
          onClick={() => setGender(item)}
          key={item}
          className={styles.buttonWrap}
        >
          <ButtonSex sexId={item} signal={signal} currentSex={sexId}/>
        </Link>
      ))}
    </div>
  )
}

