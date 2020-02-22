import React, { useEffect, useRef } from 'react'
import { createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'
import { setGender } from '../../../../stores/env'
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
      <div className={styles.buttonWrap}>
        <button onClick={() => (setGender(1))} className={`${styles.button} ${signal === 1 && styles.buttonScale}`}>Мужское</button>
        <div className={`${styles.bottomLine} ${sexId === 1 ? styles.bottomLine_true : styles.bottomLine_false}`}/>
      </div>

      <div onClick={() => (setGender(2))} className={styles.buttonWrap}>
        <button className={`${styles.button} ${signal === 2 && styles.buttonScale}`}>Женское</button>
        <div className={`${styles.bottomLine} ${sexId === 2 ? styles.bottomLine_true : styles.bottomLine_false}`}/>
      </div>
    </div>
  )
}

